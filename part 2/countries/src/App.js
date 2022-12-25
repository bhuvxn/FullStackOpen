import axios from 'axios';
import {useState, useEffect} from 'react';
function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(()=>{
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])
  

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)

  }
  const countriesToShow = filter === '' ? countries : countries.filter(countries => countries.name.common.toLowerCase().includes(filter.toLowerCase()))
  console.log(countriesToShow)

  return (
    <div className="App">
      find countries <input onChange = {handleFilterChange}/>
      
      {countriesToShow.length>10 && <div>Too many matches specify another filter</div>}
      {
      countriesToShow.length<=10 && countriesToShow.length>1 && 
      countriesToShow.map(countries => <li key={countries.name}> {countries.name.common} </li>)}


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
