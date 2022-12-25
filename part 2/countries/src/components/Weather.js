import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
const api_key = process.env.REACT_APP_API_KEY

const Weather = ({capital}) => {
 const [weather, setWeather] = useState('')
 useEffect(()=>{
    axios
    .get('https://api.openweathermap.org/data/2.5/weather?q='+ capital + '&appid='+ api_key)
    .then(response => {
        console.log(response.data)
        setWeather(response.data)
    })
  }, [capital])

  return (
    <>
    <h2>Weather in {capital}</h2>
    <p>temperature: {weather.main && weather.main.temp}</p>
    <p>wind: {weather.wind && weather.wind.speed} mph direction {weather.wind && weather.wind.deg}</p>
    <img src= "http://openweathermap.org/img/wn/10d@2x.png"  alt="weather"></img>

    </>
  )
}

export default Weather