import React, { useState, useEffect } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { PetList } from './components/PetList'
import { PetPage } from './components/PetPage'

export function App() {
  // async function loadGraveyard() {
  //   const response = await axios.get(
  //     'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets?graveyard=true'
  //   )
  //   if (response.status == 200) {
  //   }
  // }

  // async function createPet() {
  //   const response = await axios.post(
  //     'https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets'
  //   )
  //   // Body: {"name": "Stevie"}
  //   if (response.status == 200) {
  //   }
  // }
  // async function feedPet() {
  //   const response = await axios.post(
  //     `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}/Feedings`
  //   )
  //   //Body: {}
  //   if (response.status == 200) {
  //   }
  // }
  // async function scoldPet() {
  //   const response = await axios.post(
  //     `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}/Scoldings`
  //   )
  //   //Body: {}
  //   if (response.status == 200) {
  //   }
  // }
  // async function playWithPet() {
  //   const response = await axios.post(
  //     `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}/Playtimes`
  //   )
  //   //Body: {}
  //   if (response.status == 200) {
  //   }
  // }

  // async function deletePet() {
  //   const response = await axios.delete(
  //     `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}`
  //   )
  //   if (response.status == 200) {
  //   }
  // }

  // async function renamePet() {
  //   const response = await axios.put(
  //     `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}`
  //   )
  //   // Body: {"id": 14,"name": "Stevie"}
  //   if (response.status == 200) {
  //   }
  // }

  // useEffect(() => {
  //   loadPets()
  // }, [])
  return (
    <>
      <Switch>
        <Route exact path="/">
          <h1>Interact With Your Tamagotchi's!</h1>
          <button className="graveyard">
            <Link to="/graveyard">Visit Graveyard</Link>
          </button>
          <form action="">
            <label htmlFor="petName">Create a New Pet: </label>
            {/* htmlFor does something */}
            <input
              type="text"
              id="petName"
              name="petName"
              placeholder="New Pet's Name Here"
            />
            {/* <br></br> */}
          </form>
          <h3>All Pets</h3>
          <PetList />
        </Route>
        <Route exact path="/:id">
          <PetPage />
        </Route>
        <Route exact path="/graveyard">
          <h4>Please Scroll Quietly</h4>
          <p>
            These pets deserve the respect they didn't receive when they were
            alive
          </p>
          <ul>
            <li>
              <div>
                <p>Name: 5</p>
                <p>Birthday: </p>
                <p>Cause of Death: </p>
                <p>Last Day: </p>
              </div>
            </li>
            <li>
              <div>
                <p>Name: 6</p>
                <p>Birthday: </p>
                <p>Cause of Death: </p>
                <p>Last Day: </p>
              </div>
            </li>
            <li>
              <div>
                <p>Name: 7</p>
                <p>Birthday: </p>
                <p>Cause of Death: </p>
                <p>Last Day: </p>
              </div>
            </li>
            <li>
              <div>
                <p>Name: 8</p>
                <p>Birthday: </p>
                <p>Cause of Death: </p>
                <p>Last Day: </p>
              </div>
            </li>
          </ul>
          <button>
            <Link to="/">Click to Run From Guilt</Link>
          </button>
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
