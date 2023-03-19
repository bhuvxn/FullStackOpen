import express from 'express';
const app = express();

app.use(express.json())


const PORT = 4000;

app.get('/ping', (_req,res)=>{
    console.log('somebody pinged here')
    res.send('pong')
})


app.listen(PORT, ()=>{
    console.log('server running on', PORT);
});


