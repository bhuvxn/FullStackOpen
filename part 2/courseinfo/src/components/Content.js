import React from 'react'
import Part from './Part'

const Content = ({course}) => {
  const parts = course.parts;  

  return (
   <div>
    {parts.map(part=> 
        <li key={part.id}>
            <Part part = {part}/>
        </li>
        )
        }
   </div>
  )
}

export default Content