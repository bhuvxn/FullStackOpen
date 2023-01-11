const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String, 
    url: String,
    likes: Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        name: String,
        username: String
    }

})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog 