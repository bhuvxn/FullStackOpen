import React from 'react'
import Header from './Header'
import Content from './Content'

const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => {
      return sum + part.exercises;
    }, 0);
  
    return <h4>Total of {sum} exercises</h4>;
  };
const Course = ({course}) => {
  return (
    
    <div>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
    </div>
  )
}

export default Course