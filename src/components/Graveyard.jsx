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
      setDeadPets(response.data)
    }
  }

  useEffect(function () {
    loadDeadPets()
  }, [])

  return (
    <>
      <header>
        <p className="clouds">
          ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
          ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
          ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
          ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
        </p>
        <h4>Please Scroll Quietly</h4>
        <p className="clouds">
          ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
          ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
          ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
          ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
        </p>
      </header>
      {deadPets.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <article className="graveyardPlot">
          <ul className="graveyardPlot">
            {[...deadPets]
              .sort((petA, petB) =>
                petA.name.toLowerCase().localeCompare(petB.name.toLowerCase())
              )
              .map(function (deadPet) {
                return (
                  <li className="headStone">
                    <div>
                      <p className="engraving">Name: {deadPet.name}</p>
                      <p className="engraving">
                        Cause of Death:{' '}
                        {deadPet.hungerLevel >= 15 ? 'Hunger' : 'Negligence'}
                      </p>
                    </div>
                  </li>
                )
              })}
          </ul>
        </article>
      )}
      <footer className="graveyardFooter">
        <Link to="/">
          {' '}
          <button className="graveyardtoHome">Click to Run From Guilt </button>
        </Link>
      </footer>
    </>
  )
}
