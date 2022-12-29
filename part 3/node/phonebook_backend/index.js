const { default: mongoose } = require("mongoose");
const Person = require("./models/persons");
require("dotenv").config();
mongoose.set("strictQuery", false);
express = require("express"); // import express
cors = require("cors"); // import cors
const app = express(); // create express app
app.use(cors()); // use cors
app.use(express.json()); //this is why ur post wasnt working u forgot to add this
app.use(express.static("build")); //this is why ur post wasnt working u forgot to add this
const url = process.env.MONGODB_URI;

//dummy data
let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const PORT = process.env.PORT || 3002;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${phonebook.length} people</p> <p>${date}</p>`
  );
});
//route to get one persons info via id
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.send("404: Not Found");
    response.status(404).end();
  }
});
//route to delete a person from the phonebook
app.delete(":id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  if (phonebook) {
    response.json(phonebook);
  } else {
    response.send("404: Id not found");
    response.status(404).end();
  }
});




//route to add a person to the phone book
app.post("/api/persons", (request, response) => {
  const person = new Person({
    name: request.body.name,
    number: request.body.number,
    important: request.body.important,
  });
  //check if the name is already in the phonebook
  if (Person.findOne(person.name)) { 
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  person.save().then((result) => {
    console.log("person saved!");
    response.json(result);
  }
  ).catch(error => {
    console.log(error)
  });
});
