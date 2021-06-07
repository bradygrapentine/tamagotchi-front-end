import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

export function App() {
  // const []

  return (
    <>
      .
      <Switch>
        <Route exact path="/">
          <h1>Interact With Your Tamagotchi's!</h1>
          <button className="graveyard">
            <Link to="/graveyard">Visit Graveyard</Link>
          </button>
          <form>
            <label>Create a New Pet: </label>
            <input type="text" placeholder="New Pet's Name Here" />
          </form>
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
          <h1>Interact With Your Tamagotchi's!</h1>
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
              <button>Play Pet</button>
              <button>Scold Pet</button>
              <button>Feed Pet</button>
            </section>
            <button className="delete">Delete Pet</button>
          </div>{' '}
        </Route>
        <Route exact path="/2">
          <h1>Interact With Your Tamagotchi's!</h1>
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
              <button>Play Pet</button>
              <button>Scold Pet</button>
              <button>Feed Pet</button>
            </section>
            <button className="delete">Delete Pet</button>
          </div>{' '}
        </Route>
        <Route exact path="/3">
          <h1>Interact With Your Tamagotchi's!</h1>
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
              <button>Play Pet</button>
              <button>Scold Pet</button>
              <button>Feed Pet</button>
            </section>
            <button className="delete">Delete Pet</button>
          </div>{' '}
        </Route>
        <Route exact path="/4">
          <h1>Interact With Your Tamagotchi's!</h1>
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
              <button>Play Pet</button>
              <button>Scold Pet</button>
              <button>Feed Pet</button>
            </section>
            <button className="delete">Delete Pet</button>
          </div>{' '}
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
