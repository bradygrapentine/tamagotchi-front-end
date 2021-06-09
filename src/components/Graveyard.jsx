import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Graveyard() {
  const [deadPets, setDeadPets] = useState([])

  async function loadDeadPets() {
    const response = await axios.get(
      'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets?graveyard=true'
    )
    if (response.status == 200) {
      console.log(response.data)
      setDeadPets(response.data)
    }
  }

  // useEffect(function () {
  //   loadDeadPets()
  // }, [deadPets])

  useEffect(function () {
    loadDeadPets()
  }, [])

  return (
    <>
      <h4>Please Scroll Quietly</h4>
      <p>
        These pets deserve the respect they didn't receive when they were alive
      </p>
      <ul>
        {deadPets
          .sort((petA, petB) =>
            petA.name.toLowerCase().localeCompare(petB.name.toLowerCase())
          )
          .map(function (deadPet) {
            return (
              <li>
                <div>
                  <p>Name: {deadPet.name}</p>
                  {/* <p>Birthday: {deadPet.birthday}</p> */}
                  <p>
                    Cause of Death:{' '}
                    {deadPet.hungerLevel >= 15 ? 'Hunger' : 'Negligence'}
                  </p>
                  {/* <p>Last Day: </p> */}
                </div>
              </li>
            )
          })}
      </ul>
      <button>
        <Link to="/">Click to Run From Guilt</Link>
      </button>
    </>
  )
}
