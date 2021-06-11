import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// format graveyard plot so grass covers everything but sky header
// sort graveyard entries by name
// add loading content

export function Graveyard() {
  const [deadPets, setDeadPets] = useState([])

  async function loadDeadPets() {
    const response = await axios.get(
      'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets?graveyard=true'
    )
    if (response.status == 200) {
      console.log(response.data)
      response.data.sort((petA, petB) =>
        petA.name.toLowerCase().localeCompare(petB.name.toLowerCase())
      )
      setDeadPets(response.data)
    }
  }

  useEffect(function () {
    loadDeadPets()
  }, [])

  return (
    <>
      <header>
        <h4>Please Scroll Quietly</h4>
        <p> ☁️ ☁️ ☁️ ☁️ ☁️</p>
      </header>
      <p>
        These pets deserve the respect they didn't receive when they were alive
      </p>
      <article className="graveyardPlot">
        <ul>
          {deadPets.map(function (deadPet) {
            return (
              <li className="headStone">
                <div>
                  <p className="engraving">Name: {deadPet.name}</p>
                  {/* <p>Birthday: {deadPet.birthday}</p> */}
                  <p className="engraving">
                    Cause of Death:{' '}
                    {deadPet.hungerLevel >= 15 ? 'Hunger' : 'Negligence'}
                  </p>
                  {/* <p>Last Day: </p> */}
                </div>
              </li>
            )
          })}
        </ul>
        <Link to="/">
          {' '}
          <button className="graveyardtoHome">Click to Run From Guilt </button>
        </Link>
      </article>
    </>
  )
}
