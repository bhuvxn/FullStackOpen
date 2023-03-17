import express = require('express');
import bmiCalculator from './bmiCalculator';
const app = express();
app.get('/', (_req, res)=>{
    res.send("hello world")

});

const PORT  = 3005

app.listen(PORT, ()=>{
    console.log('Backend live on', PORT)
})


app.get('/bmi/:height/:weight', (req,res)=>{
    res.send (bmiCalculator(Number((req.params.height)), Number((req.params.weight)))).json();
})

