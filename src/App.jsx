import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

export function App() {
  // const []

  return (
    <>
      <header>
        <h1>Interact With Your Tamagotchi's!</h1>
      </header>
      <Switch>
        <Route exact path="/">
          <h3>All Pets</h3>
          <ul>
            <li>
              <div>
                <p>Name: 1</p>
                <p>Birthday: </p>
                <p>Hunger Level: </p>
                <p>Happiness Level: </p>
                <button>
                  <Link to="/1">Interact with 1</Link>
                </button>
              </div>
            </li>
            <li>
              <div>
                {' '}
                <p>Name: 2</p>
                <p>Birthday: </p>
                <p>Hunger Level: </p>
                <p>Happiness Level: </p>
                <button>
                  <Link to="/2">Interact with 2</Link>
                </button>
              </div>
            </li>
            <li>
              <div>
                {' '}
                <p>Name: 3</p>
                <p>Birthday: </p>
                <p>Hunger Level: </p>
                <p>Happiness Level: </p>
                <button>
                  <Link to="/3">Interact with 3</Link>
                </button>
              </div>
            </li>
            <li>
              <div>
                {' '}
                <p>Name: 4 </p>
                <p>Birthday: </p>
                <p>Hunger Level: </p>
                <p>Happiness Level: </p>
                <button>
                  <Link to="/4">Interact with 4</Link>
                </button>
              </div>
            </li>
          </ul>
        </Route>
        <Route exact path="/1">
          <button>
            <Link to="/">Go Home</Link>
          </button>
          <div>
            <p>Name: 1</p>
            <p>Birthday: </p>
            <p>Hunger Level: </p>
            <p>Happiness Level: </p>
            <p>Status: </p>
            <p>Birthday: </p>
            <p>Last Interaction: </p>
            <section>
              <button>Play</button>
              <button>Scold</button>
              <button>Feed</button>
            </section>
          </div>{' '}
        </Route>
        <Route exact path="/2">
          <button>
            <Link to="/">Go Home</Link>
          </button>
          <div>
            <p>Name: 2</p>
            <p>Birthday: </p>
            <p>Hunger Level: </p>
            <p>Happiness Level: </p>
            <p>Status: </p>
            <p>Birthday: </p>
            <p>Last Interaction: </p>
            <section>
              <button>Play</button>
              <button>Scold</button>
              <button>Feed</button>
            </section>
          </div>{' '}
        </Route>
        <Route exact path="/3">
          <button>
            <Link to="/">Go Home</Link>
          </button>
          <div>
            <p>Name: 1</p>
            <p>Birthday: </p>
            <p>Hunger Level: </p>
            <p>Happiness Level: </p>
            <p>Status: </p>
            <p>Birthday: </p>
            <p>Last Interaction: </p>
            <section>
              <button>Play</button>
              <button>Scold</button>
              <button>Feed</button>
            </section>
          </div>{' '}
        </Route>
        <Route exact path="/4">
          <button>
            <Link to="/">Go Home</Link>
          </button>
          <div>
            <p>Name: 4</p>
            <p>Birthday: </p>
            <p>Hunger Level: </p>
            <p>Happiness Level: </p>
            <p>Status: </p>
            <p>Birthday: </p>
            <p>Last Interaction: </p>
            <section>
              <button>Play</button>
              <button>Scold</button>
              <button>Feed</button>
            </section>
          </div>{' '}
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
