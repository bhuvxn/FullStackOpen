const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    important: Boolean,
})
//creating a new model, note to self the reason the model was not working was because the first parameter did not match the name of the collection in the database  q
const Person = mongoose.model('persons', personSchema)
module.exports = Person
