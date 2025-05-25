import React, {useEffect , useState} from 'react'
import DayCard from './dayCard'
const API_KEY = import.meta.env.VITE_WEATHER_KEY;

function Forecast({city}) {

    const iconMap = {
        'clear-day': '/icons/clear-day.svg',
        'clear-night': '/icons/clear-night.svg',
        'cloudy': '/icons/cloudy.svg',
        'fog': '/icons/fog.svg',
        'high': '/icons/high.svg',
        'low': '/icons/low.svg',
        'partly-cloudy-day': '/icons/partly-cloudy-day.svg',
        'partly-cloudy-night': '/icons/partly-cloudy-day.svg',
        'rain': '/icons/rain.svg',
        'showers-day': '/icons/showers-day.svg',
        'showers-night': '/icons/showers-night.svg',
        'snow-showers-day': '/icons/snow-showers-day.svg',
        'snow-showers-night': '/icons/snow-showers-night.svg',
        'snow': '/icons/snow.svg',
        'thunder-rain': '/icons/thunder-rain.svg',
        'thunder-showers-day': '/icons/thunder-showers-day.svg',
        'thunder-showers-night': '/icons/thunder-showers-night.svg',
        'wind': '/icons/wind.svg'
    }
    const [forecast, setForecast] = useState([]);

    useEffect (() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}&unitGroup=us&key=${API_KEY}&contentType=json&iconSet=icons2`);
                const data = await response.json();
                const daysWithIcons = data.days.map(day => ({
                    ...day,              
                    icon: iconMap[day.conditions]
                  }));
                setForecast(daysWithIcons);
            } catch (error) {
                console.error('error fetching data', error);
            }
        };
        fetchWeather();
    },[city]);

    const daysToShow = 7;

    return (
        <div className='containerForForecast'>
            {forecast.slice(0,daysToShow).map(day => (
                <DayCard 
                key={day.datetime}
                day={day}/>
            ))}
            

        </div>
    );





}
export default Forecast;