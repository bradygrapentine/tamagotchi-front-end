import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

export function PetPage() {
  const [pet, setPet] = useState({
    id: '',
    name: '',
    birthday: '',
    hungerLevel: '',
    happinessLevel: '',
    lastInteractedWithDate: '',
    isDead: '',
  })

  const [newName, setNewName] = useState('')

  const params = useParams()
  // @ts-ignore
  const id = params.id
  const history = useHistory()

  async function deletePet() {
    const response = await axios.delete(
      `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}`
    )
    if (response.status == 200) {
      history.push('/')
    }
  }

  async function feedPet() {
    const response = await axios.post(
      `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}/Feedings`,
      {}
    )
    if (response.status == 200) {
      getPet()
    }
  }
  async function scoldPet() {
    const response = await axios.post(
      `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}/Scoldings`,
      {}
    )
    if (response.status == 200) {
      getPet()
    }
  }
  async function playWithPet() {
    const response = await axios.post(
      `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}/Playtimes`,
      {}
    )
    if (response.status == 200) {
      getPet()
    }
  }

  async function renamePet(event) {
    event.preventDefault()
    const response = await axios.put(
      `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}`,
      {
        id: pet.id,
        name: newName,
        birthday: pet.birthday,
        hungerLevel: pet.hungerLevel,
        happinessLevel: pet.happinessLevel,
        lastInteractedWithDate: pet.lastInteractedWithDate,
        isDead: pet.isDead,
      }
    )
    if (response.status == 200) {
      getPet()
    }
    setNewName('')
  }

  async function getPet() {
    const response = await axios.get(
      `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}`
    )
    if (response.status == 200) {
      setPet(response.data)
      console.log(response.data)
    }
  }

  function formatBirthdayPage(bdayAsString) {
    let truncBday = bdayAsString.slice(0, 10).split('-').reverse()
    const [day, month, year] = truncBday
    let truncBdayString = [month, day, year].join('/')
    truncBdayString =
      truncBdayString[0] === '0'
        ? truncBdayString.slice(1, 10)
        : truncBdayString
    return truncBdayString
  }
  // format single digit months and eliminate one of these fn's
  function formatLastInteractedWithDatePage(lastDateAsString) {
    let truncLast = lastDateAsString.slice(0, 10).split('-').reverse()
    const [day, month, year] = truncLast
    let truncLastString = [month, day, year].join('/')
    truncLastString =
      truncLastString[0] === '0'
        ? truncLastString.slice(1, 10)
        : truncLastString
    return truncLastString
  }

  useEffect(() => {
    async function getPet() {
      const response = await axios.get(
        `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}`
      )
      if (response.status == 200) {
        setPet(response.data)
        console.log(response.data)
        // formatBirthday(response.data.birthday)
        // formatLastInteractedWithDate(response.data.lastInteractedWithDate)
      }
    }
    getPet()
  }, [])

  return (
    <>
      <Link to="/">
        <h2>Interact With Your Katagotchi's!</h2>
      </Link>
      <div>
        {/* Object 
        { id: 9, name: "steven", 
        birthday: "2021-06-08T22:36:10.990741", hungerLevel: 6, 
        happinessLevel: 16, 
        lastInteractedWithDate: "2021-06-09T18:07:00.842122", 
        isDead: false }
         */}
        <p>Name: {pet.name}</p>
        <p>Birthday: {formatBirthdayPage(pet.birthday)}</p>{' '}
        <p>Hunger Level: {pet.hungerLevel}</p>
        <p>Happiness Level: {pet.happinessLevel}</p>
        <p>Status: Alive</p>
        <p>
          Last Interaction:{' '}
          {formatLastInteractedWithDatePage(pet.lastInteractedWithDate)}
        </p>
        <section>
          <button onClick={playWithPet}>Play With Pet</button>
          <button onClick={scoldPet}>Scold Pet</button>
          <button onClick={feedPet}>Feed Pet</button>
        </section>
        <button className="delete" onClick={deletePet}>
          Delete Pet
        </button>
        <form onSubmit={renamePet}>
          <label>Rename Pet:</label>
          <input
            type="text"
            placeholder="Enter New Name"
            value={newName}
            onChange={event => {
              setNewName(event.target.value)
            }}
          />
        </form>
      </div>{' '}
      <section className="filler"></section>
      <footer>
        <Link to="/">Back to Pet List</Link>
      </footer>
    </>
  )
}
