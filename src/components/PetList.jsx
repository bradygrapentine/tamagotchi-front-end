import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function PetList() {
  const [deadPets, setDeadPets] = useState([])
  const [pets, setPets] = useState([])

  async function loadPets() {
    const response = await axios.get(
      'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets'
    )
    if (response.status == 200) {
      console.log(response.data)
      setPets(response.data)
    }
  }

  useEffect(function () {
    loadPets()
  }, [])

  return (
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
  )
}
