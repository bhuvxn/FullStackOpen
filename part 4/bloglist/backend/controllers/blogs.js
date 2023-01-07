const blogsRouter = require('express').Router()

const { response } = require('express');
const Blog = require('../models/Blog')

blogsRouter.get('/',(request,response)=>{
    Blog.find({}).then(blogs=>{
        response.json(blogs);
    })
})


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


module.exports = blogsRouter