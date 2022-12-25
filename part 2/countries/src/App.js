import axios from 'axios';
import {useState, useEffect} from 'react';
import Weather from './components/Weather';
function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [Show, setShow] = useState([]);
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])
  

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)

  }
  const countriesToShow = filter === '' ? countries : countries.filter(countries => countries.name.common.toLowerCase().includes(filter.toLowerCase()))
  const handleClick = value => () => {
    console.log(value);
    if (Show.includes(value)) {
      setShow(current => current.filter(item => item !== value));
      return;
    }
    setShow(current => [...current, value]);
  }


  

  return (
    <div className="App">
      find countries <input onChange = {handleFilterChange}/>
      
      {countriesToShow.length>10 && <div>Too many matches specify another filter</div>}
      {
      countriesToShow.length<=10 && countriesToShow.length>1 && 
      countriesToShow.map(countries => <li key={countries.object}> {countries.name.common} <button onClick = {handleClick(countries)}>show</button>
      {Show.includes(countries) && <div> <h1>{countries.name.common}</h1>
      <p>capital {countries.capital}</p>
      <p>area {countries.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(countries.languages).map(languages => <li key={languages}> {languages} </li>)}
        </ul>

        <img src={countries.flags.png} alt="flag" width="200" height="100"></img>
        <Weather capital={countries.capital}/>
        
      </div>}
      
       </li>)}


      {countriesToShow.length===1 &&

      <div>
      <h1>{countriesToShow[0].name.common}</h1>        
      <p>capital {countriesToShow[0].capital}</p>
      <p>area {countriesToShow[0].area}</p>
       <h2>Languages:</h2>
       <ul>
          {Object.values(countriesToShow[0].languages).map(languages => <li key={languages}> {languages} </li>)}
       </ul>

        <img src={countriesToShow[0].flags.png} alt="flag" width="200" height="100"></img>
      </div>}

    </div>
  );
}

export default App;
