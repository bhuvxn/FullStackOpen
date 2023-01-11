const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { response } = require('express');
const Blog = require('../models/Blog')
const User = require('../models/user')


//helper function for token authentication
const getTokenFrom = request =>{
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}



//getting all blogs
blogsRouter.get('/', async (request,response)=>{
    const blogs = await Blog.find({}).populate('user',{username:1, name:1})
    response.json(blogs)
        
})

//getting one blog based on id
blogsRouter.get(':/id', (request,resposne) =>{
    Blog.findById(request.params.id)
    .then(blog=>{
        if (blog){
            response.json(blog)
        }
        else {
            response.status(404).end()
        }
    }) .catch(error =>next(error))

})
//posting one blog to database  
blogsRouter.post('/', async(request,response,next)=>{
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: String,
        author: String, 
        url: String,
        likes: Number,
        user: user._id 
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedNote)
})


blogsRouter.delete('/:id', async (request,response,next)=>{
    const body = request.body 

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)   
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user._id.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    else {
        return response.status(401).json({error: 'Unauthorized to delete this blog'})
    }
})



module.exports = blogsRouter