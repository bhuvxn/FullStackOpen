import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'
    , number: '040-123456' }
  ]) 


  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

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

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value)
    setPhoneNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input onChange = {handleFilterChange}/>
      </div>


      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number:  <input value = {phoneNumber} onChange = {handlePhoneNumberChange}/></div>

      
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.name}> {person.name + ' '+ person.number} </li>)}
      </ul>
    </div>
  )
}

export default App