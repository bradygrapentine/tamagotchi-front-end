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
      console.log(response.data)
      setPets(response.data)
    }
  }

  function sortByName() {
    const sortedByName = pets.sort((petA, petB) =>
      petA.name.toLowerCase().localeCompare(petB.name.toLowerCase())
    )
    setPets(sortedByName)
    console.log(pets.map(pet => pet.name))
  }
  function sortByHappinessLevel() {
    const sortedByHappiness = pets.sort(
      (petA, petB) => Number(petB.happinessLevel) - Number(petA.happinessLevel)
    )
    setPets(sortedByHappiness)
    console.log(pets.map(pet => pet.happinessLevel))
  }
  function sortByHungerLevel() {
    const sortedByHunger = pets.sort(
      (petA, petB) => Number(petA.hungerLevel) - Number(petB.hungerLevel)
    )
    setPets(sortedByHunger)
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
    console.log(pets)
  }

  // useEffect(
  //   function () {
  //     PetList()
  //   },
  //   [pets]
  // )

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
        <label>Create New Pet: </label>
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
        <label>Search By Name: </label>
        <input
          type="text"
          placeholder="Search Here"
          value={newSearch}
          onChange={event => {
            setNewSearch(event.target.value)
          }}
        />
      </form>
      <section>
        <button onClick={sortByName}>Sort By Name</button>
        <button onClick={sortByHungerLevel}>Sort By Hunger </button>
        <button onClick={sortByHappinessLevel}>Sort By Happiness </button>
      </section>
      <h3>All Pets</h3>
      <ul>
        {pets
          .sort((petA, petB) =>
            petA.name.toLowerCase().localeCompare(petB.name.toLowerCase())
          )
          .filter(pet => pet.name.toLowerCase().includes(newSearch))
          .map(function (pet) {
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
