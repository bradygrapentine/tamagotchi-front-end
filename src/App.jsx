import React, { useState, useEffect } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { PetList } from './components/PetList'
import { PetPage } from './components/PetPage'
import { Graveyard } from './components/Graveyard'

export function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <PetList />
        </Route>
        <Route exact path="/graveyard">
          <Graveyard />
        </Route>
        <Route exact path="/:id">
          <PetPage />
        </Route>
        <Route path="*">Not Found...</Route>
      </Switch>
    </>
  )
}
