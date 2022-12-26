import React from 'react'
import DeleteButton from './DeleteButton'
const Render = ({personsToShow}) => {
  return (
    <ul>
        {personsToShow.map(person => <li key={person.name}> {person.name + ' '+ person.number} <DeleteButton person = {person}/> </li>)}
      </ul>
  )
}

export default Render