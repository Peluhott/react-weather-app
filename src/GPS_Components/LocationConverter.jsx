import React, { useEffect} from 'react'
const GPS_KEY = import.meta.env.VITE_LOCATION_KEY;

//api for fetch https://api.tomtom.com/search/2/search/{query}.json?key=YOUR_API_KEY&typeahead=true&limit=5&countrySet=US


function FetchLatLon({Location, Result}){

    const {depart, arrive} = Location;
   

    useEffect(() => {
        const FetchBothLatLon = async () => {
            if(!arrive || !depart){
                return;
            }
            try{
                const[resDepart,resArrive] = await Promise.all([
                    fetch(`https://api.tomtom.com/search/2/search/${encodeURIComponent(depart)}.json?key=${GPS_KEY}&typeahead=true&limit=1&countrySet=US`),
                    fetch(`https://api.tomtom.com/search/2/search/${encodeURIComponent(arrive)}.json?key=${GPS_KEY}&typeahead=true&limit=1&countrySet=US`)
                ]);

                const[dataDepart, dataArrive] = await Promise.all([
                    resDepart.json(),
                    resArrive.json()

                ]);
            
            Result({depart: dataDepart, arrive:dataArrive})

    } catch(error) {
            console.error("Error getting locations",error);
    }
        };
        FetchBothLatLon();
}, [depart,arrive]);
return null;
}