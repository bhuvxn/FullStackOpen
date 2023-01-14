express = require("express")
const config = require('./utils/config')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require('./utils/logger')

const middleware = require('./utils/middleware')
mongoose.set("strictQuery", false);

logger.info('connecting to', config.MONGODB_URI)

mongoose
 .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });



app.use(cors());
app.use(middleware.corsMiddleware)
app.use(express.json());

app.use(express.static('build'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter) 
app.use('/api/login', loginRouter)
module.exports = app 