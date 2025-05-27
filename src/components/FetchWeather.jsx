import React, { useEffect} from 'react'

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

function FetchForecast({ city, onForecastFetched }) {


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=H9JYK849JBHTH5HNDD9PQCHE9&contentType=json`);
                const data = await response.json();

                onForecastFetched(data.days);
            } catch (error) {
                console.error('error fetching data', error);
            }
        };
        fetchWeather();
    }, [city]);

    
return null;
    





}
export default FetchForecast;