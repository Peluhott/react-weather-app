import React, { useState, useEffect } from 'react'

let debounceTimeout;


function LocationInput({OnLocationChange}){
    const API_KEY = import.meta.env.VITE_LOCATION_KEY;
    
    
    const [depart, setDepart] = useState('')
    const [arrive, setArrive] = useState('')
    const [suggestions, setSuggestions] = useState('')
    const [activeField, setActiveField] = useState('')
    const [query, setQuery] = useState('')
    
    
    useEffect(() => {
        if(!query){
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
        return clearTimeout(debounceTimeout);
}, [query]);

const handleInputChange = (field, value) => {
    setActiveField(field);
    setQuery(value);
    

    if (field === 'depart') setDepart(value);
    else setArrive(value);
};

const handleSuggestionClick = (fullAddress) => {
    if(activeField === 'depart') setDepart(fullAddress);
    else setArrive(fullAddress);

    setSuggestions([]);
    setQuery('')
}

    

    const handleSubmit = (e) => {
         e.preventDefault();
        if(!depart || !arrive){
            alert('please fill out both fields');
            return;
        }
       
        OnLocationChange(depart, arrive);
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
                        onClick={() => handleSuggestionClick(s.address.freeFormAddress)}
                        >
                            {s.address.freeFormAddress}
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
                        onClick={() => handleSuggestionClick(s.address.freeFormAddress)}
                        >
                            {s.address.freeFormAddress}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <button type='submit'>Enter</button>
        </form>
    )

}