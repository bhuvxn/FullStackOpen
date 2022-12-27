import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Notification from './Notification'
const Form = ({persons}, {setPersons}) => {
   
    

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
      }
    
    const handlePhoneNumberChange = (event) => {
        console.log(event.target.value)
        setPhoneNumber(event.target.value)
      }
    const [newName, setNewName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [state, setState] = useState(null)


    const addName = (event) =>{
      event.preventDefault()
      console.log('buttonclicked', event.target )
      if (persons.some(person => person.name === newName)) {
       if(window.confirm (`${newName} is already added to phonebook, replace the old number with a new one?`)){

        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: phoneNumber}
        axios.put(`http://localhost:3001/persons/${person.id}`, changedPerson)
        .then(response => {
          console.log("person updated")
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
        }).catch(error => {
          console.log()
        })


        
       }
      }
      else {
      const personObject = {
        name: newName,
        number: phoneNumber,
        id: persons.length + 1,
      }
      

      axios.post('http://localhost:3001/persons', personObject)
      .then(response => {
        setState('Phone number added successfully')
        setTimeout(() => {
          setState(null)
        }, 5000)
        setPersons(persons.concat(personObject))
      }).catch(error => {
        console.log()
      })
    }
  }
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value = {phoneNumber} onChange = {handlePhoneNumberChange}/></div>

      
        <div>
          <button type="submit">add</button>
          <Notification message={state} />
        </div>
      </form>
  )
}

export default Form