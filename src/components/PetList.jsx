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
  const [bdayActive, setBdayActive] = useState(true)

  async function loadPets() {
    const response = await axios.get(
      'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets'
    )
    if (response.status == 200) {
      setPets(response.data)
    }
  }

  function byBirthday() {
    loadPets()
    setNameActive(false)
    setHungerActive(false)
    setHappinessActive(false)
    setReverseActive(false)
    setBdayActive(true)
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
    setNameActive(true)
    setHungerActive(false)
    setHappinessActive(false)
    setReverseActive(false)
    setBdayActive(false)
  }
  function sortByHappinessLevel() {
    const newPets = [...pets].sort(
      (petA, petB) => Number(petA.happinessLevel) - Number(petB.happinessLevel)
    )
    setPets(newPets)
    setNameActive(false)
    setHungerActive(false)
    setHappinessActive(true)
    setReverseActive(false)
    setBdayActive(false)
  }
  function sortByHungerLevel() {
    const newPets = [...pets].sort(
      (petA, petB) => Number(petB.hungerLevel) - Number(petA.hungerLevel)
    )
    setPets(newPets)
    setNameActive(false)
    setHungerActive(true)
    setHappinessActive(false)
    setReverseActive(false)
    setBdayActive(false)
  }

  function formatDate(dateAsString) {
    let date = Date.parse(dateAsString + '+04:00')
    let formattedDate = Intl.DateTimeFormat('en-US').format(date)
    return formattedDate
  }
  //   let truncDate = dateAsString.slice(0, 10).split('-').reverse()
  //   let [day, month, year] = truncDate
  //   day = day[0] === '0' ? (day = day[1]) : (day = day)
  //   let dateString = [month, day, year].join('/')
  //   dateString = dateString[0] === '0' ? dateString.slice(1, 10) : dateString
  //   return dateString
  // }

  async function createPet(event) {
    event.preventDefault()
    if (newName.length < 19 && newName.length > 0) {
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
                  className={bdayActive ? 'sortButton active' : 'sortButton'}
                  onClick={byBirthday}
                >
                  By Birthday
                </button>
                <button
                  className={reverseActive ? 'sortButton active' : 'sortButton'}
                  onClick={reverseOrder}
                >
                  Reverse Order
                </button>
              </ul>
            )}
          </button>
          <ul className="petList">
            {pets
              .filter(pet =>
                pet.name.toLowerCase().includes(newSearch.toLowerCase())
              )
              .map(function (pet) {
                return (
                  <Link to={`/${pet.id}`}>
                    <li className="petList">
                      <div className="petList">
                        <div className="petListName">
                          Name: <p>{pet.name}</p>
                        </div>
                        <div className="listItem">
                          Birthday: <p>{formatDate(pet.birthday)}</p>
                        </div>
                        <div className="listItem">
                          Hunger Level: <p>{pet.hungerLevel}</p>
                        </div>
                        <div className="listItem">
                          Happiness Level: <p>{pet.happinessLevel}</p>
                        </div>{' '}
                        <button className="listItem">
                          Interact with {pet.name}
                        </button>
                      </div>
                    </li>
                  </Link>
                )
              })}
          </ul>
        </>
      )}
      <footer>
        <Link to="/graveyard">
          <button className="visitGraveyard">Visit Graveyard</button>
        </Link>
      </footer>
    </>
  )
}
