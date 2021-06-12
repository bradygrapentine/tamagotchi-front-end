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
  const [petDeceased, setPetDeceased] = useState(false)

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

  function formatDate(dateAsString) {
    let truncDate = dateAsString.slice(0, 10).split('-').reverse()
    let [day, month, year] = truncDate
    day = day[0] === '0' ? (day = day[1]) : (day = day)
    let dateString = [month, day, year].join('/')
    dateString = dateString[0] === '0' ? dateString.slice(1, 10) : dateString
    return dateString
  }

  useEffect(() => {
    getPet()
  }, [])

  return (
    <>
      <Link to="/">
        <h2 className="petPage">Interact With Your Katagotchi's!</h2>
      </Link>
      {pet.id === '' ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="petPage">
            <li className="name">Name: {pet.name}</li>
            <li className="bday">Birthday: {formatDate(pet.birthday)}</li>
            <li className="hunger">Hunger Level: {pet.hungerLevel}</li>
            <li className="happiness">Happiness Level: {pet.happinessLevel}</li>
            <li className="isDead">Status: {pet.isDead ? 'Dead' : 'Alive'}</li>
            <li className="lastInteraction">
              Last Interaction: {formatDate(pet.lastInteractedWithDate)}
            </li>
            {pet.isDead ? (
              <p>
                Well then...just because they're made of data, doesn't mean they
                don't need to eat...
              </p>
            ) : (
              <>
                <li className="interactions">
                  <button className="play" onClick={playWithPet}>
                    Play With Pet
                  </button>
                  <button className="scold" onClick={scoldPet}>
                    Scold Pet
                  </button>
                  <button className="feed" onClick={feedPet}>
                    Feed Pet
                  </button>
                </li>
                <li>
                  <form className="rename" onSubmit={renamePet}>
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
                </li>
                <li>
                  <button className="delete" onClick={deletePet}>
                    Delete Pet
                  </button>
                </li>
              </>
            )}
          </ul>
        </>
      )}

      <Link to="/">
        <button className="petPage">Back to Pet List</button>
      </Link>
    </>
  )
}
