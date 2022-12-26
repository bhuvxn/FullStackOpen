import { useEffect, useState } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'
const App = () => {
  const headers = {
    'Content-Type': 'text/plain'
};
  const [notes, setNotes]= useState([])
  const [newNote, setNewNote] = useState(
    'a new note..'
  ) 

  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])
  console.log('render', notes.length, 'notes')


  const addNote = (event) =>{
    event.preventDefault()
    console.log('buttonclicked', event.target )
    const noteObject = {
      content:newNote,
      date: new Date().toISOString(),
      important: Math.random() <0.5,
      id: notes.length + 1,
    }
    axios.post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
    }).catch(error => {
      console.log()
    })
  }
  const notesToShow = showAll
  ?notes
  :notes.filter(note=> note.important===true)
  const handleNoteChange =(event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }





  const toggleImportanceOf = id => {
    const url = 'http://localhost:3001/notes/${id}'
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    axios.put(url, changedNote, {mode: "cors"}
      ).then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      })
  }


  return (
    <div>
      <h1>Notes</h1>
      <div> 
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll ? 'important':'all'}
        </button>
      </div>


      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} 
          toggleImportance={()=>toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value = {newNote}
        onChange = {handleNoteChange}
        />
        <button type = "submit">save</button>
      </form>
    </div>  
  )
}

export default App