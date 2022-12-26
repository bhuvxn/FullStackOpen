import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const DeleteButton = ({person}) => {
    const deletePerson = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            axios.delete(`http://localhost:3001/persons/${person.id}`)
        .then(response => {
            console.log("person deleted")
        }).catch(error => {
            console.log()
        })
        }
        else {
            console.log("person not deleted")
        }
        
    }
  return (
    <button onClick = {deletePerson}>delete</button>
  )
}


export default DeleteButton