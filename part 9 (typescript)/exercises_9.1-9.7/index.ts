import express = require('express');
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';
const app = express();
app.use(express.json());

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

app.post('/calculator', (req,res)=>{
    let daily_exercises = req.body.daily_exercises
    let target = req.body.target
    res.send((exerciseCalculator(daily_exercises, target))).json
})

