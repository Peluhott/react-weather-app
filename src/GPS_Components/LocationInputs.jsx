import React, { useState, useEffect } from 'react'

let debounceTimeout; // fix this don't forget


function LocationInput({OnLocationChange}){
    const API_KEY = import.meta.env.VITE_LOCATION_KEY;
    
    
    const [depart, setDepart] = useState('')
    const [arrive, setArrive] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [activeField, setActiveField] = useState('')
    const [query, setQuery] = useState('')
    
    
    useEffect(() => {
        if(!query){
            setSuggestions([]);
            return;
        }
        if(query.length < 3) {
            setSuggestions([]);
            return;
        }

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            fetch(`https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${API_KEY}&limit=5`)
        .then((res) => res.json())
        .then((data) => {
            setSuggestions(data.results || []);
        });

        }, 300);
        return () => clearTimeout(debounceTimeout);
}, [query, API_KEY]);

const handleInputChange = (field, value) => {
    setActiveField(field);
    setQuery(value);
    

    if (field === 'depart') setDepart(value);
    else setArrive(value);
};

const handleSuggestionClick = (s) => {
    if(activeField === 'depart') setDepart(s.freeformAddress);
    else setArrive(s.freeformAddress);

    setSuggestions([]);
    setQuery('')
}

    

    const handleSubmit = (e) => {
         e.preventDefault();
        if(!depart || !arrive){
            alert('please fill out both fields');
            return;
        }
       
        OnLocationChange({depart, arrive, departureDate, departureTime});
    }


    return (
        <form className='locationInput' onSubmit={handleSubmit}>
            <div className='autocomplete'>
            <input
            type='text'
            placeholder='Enter Depart'
            value={depart}
            onChange= {(e) => handleInputChange('depart', e.target.value)}
            />
            {activeField==='depart' && suggestions.length > 0 &&(
                <ul className='suggestions'>
                    {suggestions.map( s => (
                        <li 
                        key={s.id}
                        onClick={() => handleSuggestionClick(s)}
                        >
                            {s.address.freeformAddress}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <div className='autocomplete'>
            <input
            type='text'
            placeholder='Enter Arrival'
            value={arrive}
            onChange={(e) => handleInputChange('arrive',e.target.value)}
            />
            {activeField==='arrive' && suggestions.length > 0 &&(
                <ul className='suggestions'>
                    {suggestions.map( s => (
                        <li 
                        key={s.id}
                        onClick={() => handleSuggestionClick(s)}
                        >
                            {s.address.freeformAddress}
                        </li>
                    ))}
                </ul>
            )}
            </div>

            <input 
            type='date'
            placeholder='Enter date'
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            />

            <input
            type='time'
            placeholder='Enter time'
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            />
            <button type='submit'>Enter</button>
        </form>
    );

}
export default LocationInput;