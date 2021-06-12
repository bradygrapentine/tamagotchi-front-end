import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function PetList() {
  const [pets, setPets] = useState([])
  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [dropDown, setDropDown] = useState(false)
  const [nameActive, setNameActive] = useState(false)
  const [hungerActive, setHungerActive] = useState(false)
  const [happinessActive, setHappinessActive] = useState(false)
  const [reverseActive, setReverseActive] = useState(false)

  async function loadPets() {
    const response = await axios.get(
      'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets'
    )
    if (response.status == 200) {
      setPets(response.data)
    }
  }

  function resetSort() {
    loadPets()
    setNameActive(false)
    setHungerActive(false)
    setHappinessActive(false)
    setReverseActive(false)
  }

  function reverseOrder() {
    const reversedPets = [...pets].reverse()
    setPets(reversedPets)
    setReverseActive(!reverseActive)
  }

  function sortByName() {
    const newPets = [...pets].sort((petA, petB) =>
      petA.name.toLowerCase().localeCompare(petB.name.toLowerCase())
    )
    setPets(newPets)
    console.log(pets.map(pet => pet.name))
    setNameActive(true)
    setHungerActive(false)
    setHappinessActive(false)
    setReverseActive(false)
  }
  function sortByHappinessLevel() {
    const newPets = [...pets].sort(
      (petA, petB) => Number(petA.happinessLevel) - Number(petB.happinessLevel)
    )
    setPets(newPets)
    console.log(pets.map(pet => pet.happinessLevel))
    setNameActive(false)
    setHungerActive(false)
    setHappinessActive(true)
    setReverseActive(false)
  }
  function sortByHungerLevel() {
    const newPets = [...pets].sort(
      (petA, petB) => Number(petB.hungerLevel) - Number(petA.hungerLevel)
    )
    setPets(newPets)
    console.log(pets.map(pet => pet.hungerLevel))
    setNameActive(false)
    setHungerActive(true)
    setHappinessActive(false)
    setReverseActive(false)
  }

  async function createPet(event) {
    if (newName.length < 19) {
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
      <h2 className="mainHeader">Interact With Your Katagotchis!</h2>
      <form onSubmit={createPet} className="createNewPet">
        <label className="createNewPet">Create Katagotchi:</label>
        <input
          className="createNewPet"
          type="text"
          placeholder="< 19 Characters/Name"
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
            Sort Katagotchis
            {dropDown === false ? (
              <></>
            ) : (
              <ul className="dropdown-content">
                <button
                  className={nameActive ? 'sortButton active' : 'sortButton'}
                  onClick={sortByName}
                >
                  By Name
                </button>
                <button
                  className={hungerActive ? 'sortButton active' : 'sortButton'}
                  onClick={sortByHungerLevel}
                >
                  By Hunger
                </button>
                <button
                  className={
                    happinessActive ? 'sortButton active' : 'sortButton'
                  }
                  onClick={sortByHappinessLevel}
                >
                  By Happiness
                </button>
                <button
                  className={reverseActive ? 'sortButton active' : 'sortButton'}
                  onClick={reverseOrder}
                >
                  Reverse Order
                </button>
                <button className="sortButton" onClick={resetSort}>
                  Reset
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
                    <li className="petList">
                      <div className="petList">
                        <p className="petListName">
                          Name: <p>{pet.name}</p>
                        </p>
                        <p className="petListBday">
                          Birthday:{' '}
                          <p>
                            {Intl.DateTimeFormat('en-US').format(
                              Date.parse(pet.birthday)
                            )}
                          </p>
                        </p>
                        <p className="petList Item Hunger">
                          Hunger Level: <p>{pet.hungerLevel}</p>
                        </p>
                        <p className="petList Item Happiness">
                          Happiness Level: <p>{pet.happinessLevel}</p>
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
