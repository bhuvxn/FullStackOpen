import express = require ('express');
const app = express()
var cors = require('cors')
app.use(express.json())
app.use(cors())
let PORT = 3001
app.listen(PORT, ()=>{
    console.log("server running on ", PORT)
})

app.get('/api/ping', (_req, res)=>{
    res.send('pong')
})