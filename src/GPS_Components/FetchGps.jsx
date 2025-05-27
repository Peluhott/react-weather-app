const fetch = url(`https://api.tomtom.com/routing/1/calculateRoute/${encodeURIComponent(route)}/json?computeTravelTimeFor=all&departAt=${encodeURIComponent(departureDate)}&key=${GPS_KEY}`)
const route = //departure:arrival
const depart = location //latitude,longitude
const arrive = location //latitude,longitude
const departureDate =  //YYYY-MM-DDTHH:MM:SS

const GPS_KEY = import.meta.env.VITE_LOCATION_KEY;