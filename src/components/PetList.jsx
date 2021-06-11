import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function PetList() {
  const [pets, setPets] = useState([])
  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')

  async function loadPets() {
    const response = await axios.get(
      'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets'
    )
    if (response.status == 200) {
      setPets(response.data)
    }
  }

  function reverseOrder() {
    let reversedPets = [...pets].reverse()
    setPets(reversedPets)
  }

  function sortByBirthday() {
    let newPets = [...pets].sort(pet => Date.parse(pet.birthday))
    setPets(newPets)
    console.log(pets.map(pet => pet.birthday))
  }
  function sortByName() {
    let newPets = [...pets].sort((petA, petB) =>
      petA.name.toLowerCase().localeCompare(petB.name.toLowerCase())
    )
    setPets(newPets)
    console.log(pets.map(pet => pet.name))
  }
  function sortByHappinessLevel() {
    let newPets = [...pets].sort(
      (petA, petB) => Number(petA.happinessLevel) - Number(petB.happinessLevel)
    )
    setPets(newPets)
    console.log(pets.map(pet => pet.happinessLevel))
  }
  function sortByHungerLevel() {
    let newPets = [...pets].sort(
      (petA, petB) => Number(petA.hungerLevel) - Number(petB.hungerLevel)
    )
    setPets(newPets)
    console.log(pets.map(pet => pet.hungerLevel))
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
      <h2>Interact With Your Katagotchi's!</h2>
      {/* <button className="graveyard">
        <Link to="/graveyard">Visit Graveyard</Link>
      </button> */}
      <form onSubmit={createPet}>
        <label>Create New Pet:</label>
        <input
          type="text"
          placeholder="Enter New Pet's Name"
          value={newName}
          onChange={event => {
            setNewName(event.target.value)
          }}
        />
      </form>
      <form onSubmit={event => event.preventDefault()}>
        <label>Filter By Name:</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={newSearch}
          onChange={event => {
            setNewSearch(event.target.value)
          }}
        />
      </form>
      <button className="dropdown">
        Sort Pets
        <div className="dropdown-content">
          <button onClick={sortByBirthday}>By Birthday</button>
          <button onClick={sortByName}>By Name</button>
          <button onClick={sortByHungerLevel}>By Hunger</button>
          <button onClick={sortByHappinessLevel}>By Happiness</button>
          <button onClick={reverseOrder}>Reverse Order</button>
        </div>
      </button>
      {/* <h3>All Pets</h3> */}
      <ul>
        {pets
          .filter(pet => pet.name.toLowerCase().includes(newSearch))
          .map(function (pet) {
            return (
              <li>
                <div>
                  <p>Name: {pet.name}</p>
                  <p>
                    Birthday:{' '}
                    {Intl.DateTimeFormat('en-US').format(
                      Date.parse(pet.birthday)
                    )}
                  </p>
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
      <button className="graveyard">
        <Link to="/graveyard">Visit Graveyard</Link>
      </button>
    </>
  )
}
