import React,  { useEffect } from 'react'


//departure:arrival
//latitude,longitude
//latitude,longitude
//YYYY-MM-DDTHH:MM:SS

const GPS_KEY = import.meta.env.VITE_LOCATION_KEY;

function FetchGPS({location, routeInfo}){
    const [depart, arrive,departureDate, departureTime] = location
    const latLonFormatted = `${depart.lat},${depart.lon}:${arrive.lat},${arrive.lon}`
    const timeFormatted = `${departureDate}T${departureTime}:00`

    useEffect(() => {
        const fetchRoute = async () => {
            if(!depart || !arrive || !departureDate){
                return;
            }
            try {
                const response = await fetch(`https://api.tomtom.com/routing/1/calculateRoute/${encodeURIComponent(latLonFormatted)}/json?computeTravelTimeFor=all&departAt=${encodeURIComponent(timeFormatted)}&key=${GPS_KEY}`);
                const data = await response.json();
                routeInfo(data)
            } catch (error) {
                console.error('error fetching route info', error)
            }
            
            
        }
        fetchRoute();
    },[location,departureDate,departureTime]);
    return null;
}