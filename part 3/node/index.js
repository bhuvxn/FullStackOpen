express = require('express'); // import express
cors = require('cors'); // import cors
const app = express(); // create express app
app.use(cors()); // use cors
app.use(express.json()) //this is why ur post wasnt working u forgot to add this 
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];
//indicate that the server is running
app.get('/', (request, response) => {
    response.send('<h1>Server is running</h1>')
})




//route to get all notes
app.get('/api/notes', (request, response)=>{
    response.json(notes)
})


app.get('/api/notes/:id', (request, response)=>{
    //note that the bug where you could not find the id was because of the fact that the id was a string and the id in the notes array was a number
    const id = Number(request.params.id)
    console.log(id)
    //in order to search remember that you cannot simply use brackets, you need to get rid of the compact syntax and create a function with an explicit return statement
    const note = notes.find(
        note=>{
            console.log(note.id, typeof note.id, id, typeof id, note.id === (id))
            return note.id === id
        }

    )
    if(note){
    response.json(note)
    }
    else {
        response.send("404: Not Found")
        response.status(404).end()//404 means that the resource was not found
    }
})

//adding route for delteting a note
app.delete('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    notes = notes.filter(notes=>notes.id !== id)
    response.status(204).end()
})
//adding route to make a new note
app.post('/api/notes', (request, response)=>{
    const note = requjest.body
    console.log(note)
    response.json(note)
})

const PORT = 3001;
//indicate server port number
app.listen(PORT);
//indicate that the server is running
console.log(`Server running on port ${PORT}`);
