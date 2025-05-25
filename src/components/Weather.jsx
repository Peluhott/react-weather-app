import React, {useEffect , useState} from 'react'
import DayCard from './dayCard'

function Forecast({city}) {
    const [forecast, setForecast] = useState([]);

    useEffect (() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}unitGroup=us&key=H9JYK849JBHTH5HNDD9PQCHE9&contentType=json`);
                const data = await response.json();
                setForecast(data.days);
            } catch (error) {
                console.error('error fetching data', error);
            }
        };
        fetchWeather();
    },[city]);





}