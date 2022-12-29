const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }
const password = process.argv[2]
const url =  `mongodb+srv://bhuvan:${password}@cluster0.n2tcltq.mongodb.net/Phonebook?retryWrites=true&w=majority`
//designing schema for model


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    important: Boolean,
})
//creating a new model, note to self the reason the model was not working was because the first parameter did not match the name of the collection in the database  q
const Person = mongoose.model('persons', personSchema)


if (process.argv.length === 3){
    Person.find({}).then(result=>{
        console.log('phonebook:')
        result.forEach(person=>{
            console.log(person.name, person.number)
    }
)
        mongoose.connection.close()
    })
}


//connecting to the database
mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        important: process.argv[5] === 'true' ? true : false,
    })
    return person.save()

}
).then(result=>{
    console.log('person saved!')
    mongoose.connection.close()
}).catch(error => {
    console.log(error)
})