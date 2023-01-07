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
const PORT = process.env.PORT || 3002;

//error handling middle ware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

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

//route to get all persons info
app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

//returning phonebook info length
app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${Person.length} people</p> <p>${date}</p>`
  );
});

//route to get one persons info via id
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = Person.find((person) => person.id === id);
  if (person) {
    console.log("yo person found")
  } else {
    response.send("404: Not Found");
    response.status(404).end();
  }
});
//route to delete a person from the phone book



app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log(id);
  Person.findByIdAndRemove(id)
    .then((result) => {
      console.log("person deleted");
      response.status(204).end();
    })
    .catch((error) => next(error));

})
//route to update a persons info
//route to find one person from the phonebook
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

//route to update a persons info
app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = {
    name: request.body.name,
    number: request.body.number,
    important: request.body.important,
  };
  Person.findByIdAndUpdate(id, person)
    .then((result) => {
      console.log("person updated");
      response.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});


//route to add a person to the phone book
app.post("/api/persons", (request, response) => {
  const person = new Person({
    name: request.body.name,
    number: request.body.number,
    important: request.body.important,
  });  
  //first check if the person already exists
    person
    .save()
    .then((result) => {
      console.log("person saved!");
      response.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
