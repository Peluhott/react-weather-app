import React,  {useState, useEffect} from 'react'


const route = //departure:arrival
const depart = location //latitude,longitude
const arrive = location //latitude,longitude
const departureDate =  //YYYY-MM-DDTHH:MM:SS

const GPS_KEY = import.meta.env.VITE_LOCATION_KEY;

function FetchGPS({location, routeInfo}){
    const [arrive, depart] = location
    const latLonFormatted = `${depart.lat},${depart.lon}:${arrive.lat},${arrive.lon}`

    useEffect(() => {
        const fetchRoute = async () => {
            if(!depart || !arrive || departureDate){
                return;
            }
            try {
                const response = await fetch(`https://api.tomtom.com/routing/1/calculateRoute/${encodeURIComponent(latLonFormatted)}/json?computeTravelTimeFor=all&departAt=${encodeURIComponent(departureDate)}&key=${GPS_KEY}`);
                const data = await response.json();
                routeInfo(data)
            } catch (error) {
                console.error('error fetching route info', error)
            }
            
            
        }
        fetchRoute();
    },[location,departureDate,]);
    return null;
}