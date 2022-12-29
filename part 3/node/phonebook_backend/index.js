express = require('express'); // import express
cors = require('cors'); // import cors
const app = express(); // create express app
app.use(cors()); // use cors
app.use(express.json()) //this is why ur post wasnt working u forgot to add this

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
const PORT = 3002.
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


app.get('/', (request,response)=>{
    response.json(phonebook)
})

app.get('/info', (request,response)=>{
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p>, <p>${new Date()}</p>`)
   
})
//route to get one persons info via id
app.get('/api/persons/:id', (request,response)=>{
    const id = Number(request.params.id)
    const person = phonebook.find(person=>person.id === id)
    if(person){
        response.json(person)
    }
    else{
        response.send("404: Not Found")
        response.status(404).end()
    }
  })
//route to delete a person from the phonebook
app.delete('/api/persons/:id', (request,response)=>{
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person=>person.id !== id)
    if (phonebook){
        response.json(phonebook)
    } else {
      response.send("404: Id not found")
      response.status(404).end()
    }

})
//route to add a person to the phone book 
app.post('/api/persons', (request,response)=>{
  const new_person = request.body
  //checking if new person already exists in the database
  const person = phonebook.find(person=>person.name === new_person.name)
  if(person){
    response.send("Error person already exists in the database")
    response.status(409).end()
  }
  else{
    phonebook = phonebook.concat(new_person)
    response.send('success person added to the database')
  }
})