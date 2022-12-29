import { useEffect, useState } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Render from './components/Render'
import axios from 'axios'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  useEffect(()=>{
    console.log('effect')
    axios
    .get('/api/persons')
    .then(response => {
      console.log('promise fulfilled')
  
      setPersons(response.data)
    }).catch(error=>{
      console.log(error)
    })
  }, [])
  
  console.log(persons)


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