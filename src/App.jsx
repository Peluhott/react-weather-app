import { useState } from 'react'
import DayCard from './components/DayCard'
import CityInput from './components/CityInput'
import FetchForecast from './components/FetchWeather'
import GenerateWeather from './components/GenerateWeather'
import './App.css'

function App() {
  const [city, setCity] = useState('defaultCity');
  const [forecast, setForecast] = useState([]);

  return (
    <>
     <div className='main-container'>
        
             
        
    </div>
     
    </>

  );
}

export default App
