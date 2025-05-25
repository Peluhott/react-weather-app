import React, { useState } from 'react'

function CityInput({onCityChange}){
    const [cityInput, setCityInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(cityInput.trim()){
            onCityChange(cityInput.trim())
            setCityInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            placeholder='Enter a City'
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
        />
        <button type='submit'>Search</button>
        </form>
    );
}