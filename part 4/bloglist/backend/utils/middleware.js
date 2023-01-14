const { RepeatOneSharp } = require('@material-ui/icons')
const logger = require('./logger')

var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    next();
}
const requestLogger=(request,response,next)=>{
    logger.info('Method:', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) =>{
    response.status(404).send({error:'unknown endpoint'})
}

const errorHandler = (error, request, response, next)=>{
    logger.error(error.message)
    if(error.name === 'CaSTERROR'){
        return response.status(400).send({error: 'malformatted id'})
    }else if (error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
    next(error)

}
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request["token"] = authorization.substring(7)
    }
    next()
  }

const tokenValidator = (request, response, next) => {
    const token = request.token
    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }
    next()
}



module.exports = {
    corsMiddleware,
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    tokenValidator
}