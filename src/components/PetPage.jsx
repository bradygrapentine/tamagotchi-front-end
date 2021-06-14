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
    if (!pet.isDead) {
      const response = await axios.delete(
        `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}`
      )
      if (response.status == 200) {
        history.push('/')
      }
    } else {
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
    if (!pet.isDead) {
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
    let date = Date.parse(dateAsString + '+04:00')
    // let newOptions = {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    // }
    let formattedDate = Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
    }).format(date)
    return formattedDate
  }

  useEffect(() => {
    getPet()
  }, [])

  return (
    <>
      <Link to="/">
        <h3 className="petPage">Interact With Your Katagotchis!</h3>
      </Link>
      {pet.id === '' ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="deleteAndRename">
            <form className="rename" onSubmit={renamePet}>
              <label>Rename Katagotchi:</label>
              <input
                type="text"
                placeholder="Enter New Name"
                value={newName}
                onChange={event => {
                  setNewName(event.target.value)
                }}
              />
            </form>
            <button className="delete" onClick={deletePet}>
              Delete Katagotchi
            </button>
          </ul>
          <div className="petPage">
            <ul className="petPage">
              <li className="name">
                Name: <p>{pet.name}</p>
              </li>
              <li className="bday">
                Birthday: <p>{formatDate(pet.birthday)}</p>
              </li>
              <li className="hunger">
                Hunger Level: <p>{pet.hungerLevel}</p>
              </li>
              <li className="happiness">
                Happiness Level: <p>{pet.happinessLevel}</p>
              </li>
              <li className="isDead">
                Status: <p>{pet.isDead ? 'Dead' : 'Alive'}</p>
              </li>
              <li className="lastInteraction">
                Last Interaction:{' '}
                <p>{formatDate(pet.lastInteractedWithDate)}</p>
              </li>
            </ul>
            {pet.isDead ? (
              <p>
                Well then...just because they're made of data, doesn't mean they
                don't need to eat...
              </p>
            ) : (
              <ul className="petInteractions">
                <li className="interactions">
                  <a
                    className="katagotchiImage"
                    href="https://placekeanu.com/240/280/y"
                  >
                    <img
                      src="https://placekeanu.com/240/280/y"
                      alt="Image Unavailable"
                    />
                  </a>
                  <button className="play" onClick={playWithPet}>
                    Play With Katagotchi
                  </button>
                  <button className="scold" onClick={scoldPet}>
                    Scold Katagotchi
                  </button>
                  <button className="feed" onClick={feedPet}>
                    Feed Katagotchi
                  </button>
                </li>
              </ul>
            )}
          </div>
        </>
      )}
      <footer>
        {' '}
        <Link to="/">
          <button className="petPageToHome">Back to Katagotchi List</button>
        </Link>
      </footer>
    </>
  )
}
