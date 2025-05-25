import React, {useEffect , useState} from 'react'
import DayCard from './dayCard'
const API_KEY = import.meta.env.VITE_WEATHER_KEY;

function Forecast({city}) {
    const [forecast, setForecast] = useState([]);

    useEffect (() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}unitGroup=us&key=${API_KEY}&contentType=json`);
                const data = await response.json();
                setForecast(data.days);
            } catch (error) {
                console.error('error fetching data', error);
            }
        };
        fetchWeather();
    },[city]);





}