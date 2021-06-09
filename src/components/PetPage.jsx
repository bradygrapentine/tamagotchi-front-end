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
  const id = params.id // { id: 42 }        id variable = 42
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

  useEffect(() => {
    getPet()
  }, [id])

  useEffect(() => {
    async function getPet() {
      const response = await axios.get(
        `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}`
      )
      if (response.status == 200) {
        setPet(response.data)
        console.log(response.data)
      }
    }
    getPet()
  }, [])

  return (
    <>
      <h1>Interact With Your Tamagotchi's!</h1>
      <button>
        <Link to="/">Go Home</Link>
      </button>
      <div>
        <p>Name: {pet.name}</p>
        <p>Birthday: {pet.birthday}</p>
        <p>Hunger Level: {pet.hungerLevel}</p>
        <p>Happiness Level: {pet.happinessLevel}</p>
        <p>Status: Alive</p>
        <p>Last Interaction: {pet.lastInteractedWithDate} </p>
        <section>
          <button onClick={playWithPet}>Play With Pet</button>
          <button onClick={scoldPet}>Scold Pet</button>
          <button onClick={feedPet}>Feed Pet</button>
        </section>
        <button className="delete" onClick={deletePet}>
          Delete Pet
        </button>
        <form onSubmit={renamePet}>
          <input
            type="text"
            placeholder="Enter New Name and Press Enter"
            value={newName}
            onChange={event => {
              setNewName(event.target.value)
            }}
          />
        </form>
      </div>{' '}
    </>
  )
}
