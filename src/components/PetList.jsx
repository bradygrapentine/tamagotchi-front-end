import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function PetList() {
  const [pets, setPets] = useState([])
  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [dropDown, setDropDown] = useState(false)

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
    if (newName.length < 21) {
      event.preventDefault()
      const response = await axios.post(
        'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets',
        { name: newName }
      )
      if (response.status == 201) {
        loadPets()
      }
    }
    setNewName('')
  }

  useEffect(function () {
    loadPets()
  }, [])

  return (
    <>
      <h2 className="mainHeader">Interact With Your Katagotchi's!</h2>
      <form onSubmit={createPet} className="createNewPet">
        <label className="createNewPet">Create New Pet:</label>
        <input
          className="createNewPet"
          type="text"
          placeholder="< 21 Characters/Name"
          value={newName}
          onChange={event => {
            setNewName(event.target.value)
          }}
        />
      </form>
      {pets.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <form
            className="filterByName"
            onSubmit={event => event.preventDefault()}
          >
            <label className="filterByName">Filter By Name:</label>
            <input
              className="filterByName"
              type="text"
              placeholder="Enter Name"
              value={newSearch}
              onChange={event => {
                setNewSearch(event.target.value)
              }}
            />
          </form>
          <button onClick={() => setDropDown(!dropDown)} className="dropdown">
            {' '}
            Sort Pets
            {dropDown === false ? (
              <></>
            ) : (
              <ul className="dropdown-content">
                <button className="sortButton" onClick={sortByBirthday}>
                  By Birthday
                </button>
                <button className="sortButton" onClick={sortByName}>
                  By Name
                </button>
                <button className="sortButton" onClick={sortByHungerLevel}>
                  By Hunger
                </button>
                <button className="sortButton" onClick={sortByHappinessLevel}>
                  By Happiness
                </button>
                <button className="sortButton" onClick={reverseOrder}>
                  Reverse Order
                </button>
              </ul>
            )}
          </button>
          <ul className="petList">
            {pets
              .filter(pet => pet.name.toLowerCase().includes(newSearch))
              .map(function (pet) {
                return (
                  <Link to={`/${pet.id}`}>
                    <li className="petList Item">
                      <div className="petList Item">
                        <p className="petList Item Name">Name: {pet.name}</p>
                        <p className="petList Item Bray">
                          Birthday:{' '}
                          {Intl.DateTimeFormat('en-US').format(
                            Date.parse(pet.birthday)
                          )}
                        </p>
                        <p className="petList Item Hunger">
                          Hunger Level: {pet.hungerLevel}
                        </p>
                        <p className="petList Item Happiness">
                          Happiness Level: {pet.happinessLevel}
                        </p>
                        <Link to={`/${pet.id}`}>
                          {' '}
                          <button className="petList Item Interact">
                            Interact with {pet.name}
                          </button>
                        </Link>
                      </div>
                    </li>
                  </Link>
                )
              })}
          </ul>
          <Link to="/graveyard">
            <button className="visitGraveyard">Visit Graveyard</button>
          </Link>
        </>
      )}
    </>
  )
}
