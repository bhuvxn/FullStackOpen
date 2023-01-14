const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const cors = require('cors')
usersRouter.post('/', async (request, response)  =>{
    const {username, name, password} = request.body 
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const existingUser = await User.findOne({username})
    if (existingUser){
        return response.status(400).json({
            error : "username must be unique"
        })
    }

    if (password.length< 3) {
        return response.status(400).json({
            error : "username and password must be at least 3 characters long"
        })
    }
    
    const user = new User({
        username,
        name,
        passwordHash
    })  
    const savedUser = await user.save()
    return response.status(201).json(savedUser)



})

usersRouter.get('/', async (request, response) =>{
const users = await User.find({})
  response.json(users)

})

module.exports = usersRouter