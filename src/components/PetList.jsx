import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function PetList() {
  const [pets, setPets] = useState([])
  const [newName, setNewName] = useState('')

  async function loadPets() {
    const response = await axios.get(
      'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets'
    )
    if (response.status == 200) {
      console.log(response.data)
      setPets(response.data)
    }
  }

  async function createPet(event) {
    event.preventDefault()
    const response = await axios.post(
      'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets',
      { name: newName }
    )
    if (response.status == 201) {
      loadPets()
    }
    setNewName('')
  }

  useEffect(function () {
    loadPets()
  }, [])

  return (
    <>
      <h1>Interact With Your Tamagotchi's!</h1>
      <button className="graveyard">
        <Link to="/graveyard">Visit Graveyard</Link>
      </button>
      <form onSubmit={createPet}>
        <input
          type="text"
          placeholder="Enter Name and Press Enter"
          value={newName}
          onChange={event => {
            setNewName(event.target.value)
          }}
        />
      </form>
      <h3>All Pets</h3>
      <ul>
        {pets.map(function (pet) {
          return (
            <li>
              <div>
                <p>Name: {pet.name}</p>
                <p>Birthday: {pet.birthday}</p>
                <p>Hunger Level: {pet.hungerLevel}</p>
                <p>Happiness Level: {pet.happinessLevel}</p>
                <button>
                  <Link to={`/${pet.id}`}>Interact with {pet.name}</Link>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
