import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 


  const [newName, setNewName] = useState('')




  const addName = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    const nameObject = {
      name: newName,
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
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App