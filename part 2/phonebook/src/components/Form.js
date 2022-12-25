import React from 'react'
import { useState } from 'react'
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
    const addName = (event) => {
        event.preventDefault()
        /*..check if name already exists in list and send alert.*/
    
        for (var i = 0; i < persons.length; i++) { console.log(persons[i].name) 
          if (persons[i].name === newName) {
            alert(`${newName} is already added to phonebook`)
            return
          }
        }
    
    
        console.log(event.target.value)
        const nameObject = {
          name: newName,
          number: phoneNumber,
          id: persons.length + 1,
        }
        console.log(nameObject)
        setNewName('')
        setPersons(persons.concat(nameObject))
      }
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number:  <input value = {phoneNumber} onChange = {handlePhoneNumberChange}/></div>

      
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default Form