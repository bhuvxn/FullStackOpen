import { useState } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Render from './components/Render'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'
    , number: '040-123456' }
  ]) 

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter person = {persons}/>
      </div>


      <h2>add a new</h2>
      <Form persons = {persons} setPersons = {setPersons}/>
      <h2>Numbers</h2>
      <Render personsToShow = {persons}/>
    </div>
  )
}

export default App