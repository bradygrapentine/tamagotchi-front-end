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
  const { id } = useParams() // { id: 42 }        id variable = 42
  const history = useHistory()

  useEffect(() => {
    async function getPet() {
      const response = await axios.get(
        `https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/${id}`
      )
      if (response.status == 200) {
        setPet(response.data)
        console.log(response.data)
      }
    }
    getPet()
  }, [id])

  return (
    <>
      <h1>Interact With Your Tamagotchi's!</h1>
      <button>
        <Link to="/">Go Home</Link>
      </button>
      <div>
        <p>Name: {pet.name}</p>
        <p>Birthday: {pet.birthday}</p>
        <p>Hunger Level: {pet.hungerLevel}</p>
        <p>Happiness Level: {pet.happinessLevel}</p>
        <p>Status: {pet.isDead == true ? 'Dead' : 'Alive'}</p>
        <p>Last Interaction: {pet.lastInteractedWithDate} </p>
        <section>
          <button>Play Pet</button>
          <button>Scold Pet</button>
          <button>Feed Pet</button>
        </section>
        <button className="delete">Delete Pet</button>
      </div>{' '}
    </>
  )
}

// import React, { useEffect, useState } from 'react'
// import { useHistory, useParams } from 'react-router'
// import axios from 'axios'
// import { Link } from 'react-router-dom'

// export function TodoItemPage() {
//   const [todoItem, setTodoItem] = useState({
//     id: undefined,
//     text: '',
//     complete: false,
//     created_at: undefined,
//     updated_at: undefined,
//   })
//   const { id } = useParams() // { id: 42 }        id variable = 42
//   const history = useHistory()

//   useEffect(
//     function () {
//       // Load the one item who's id is params.id
//       async function loadOneItem() {
//         const response = await axios.get(
//           `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort42`
//         )

//         if (response.status === 200) {
//           setTodoItem(response.data)
//         }
//       }

//       loadOneItem()
//     },
//     [id]
//   )

//   async function deleteTodoItem() {
//     const response = await axios.delete(
//       `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort42`
//     )

//     if (response.status === 204) {
//       // Redirect the user back to the home page!
//       history.push('/')
//     }
//   }

//   return (
//     <div>
//       <Link to="/">Go Home</Link>
//       <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
//       <p>Created: {todoItem.created_at}</p>
//       <p>Updated: {todoItem.updated_at}</p>
//       <button onClick={deleteTodoItem}>Delete</button>
//     </div>
//   )
// }
