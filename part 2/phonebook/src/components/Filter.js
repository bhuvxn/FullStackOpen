import React from 'react'
import { useState } from 'react'
const Filter = ({persons}) => {
    const [filter, setFilter] = useState('')
    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)
      }
    persons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
   return (
    <div>
        filter: <input onChange = {handleFilterChange}/>
      </div>
  )
}

export default Filter