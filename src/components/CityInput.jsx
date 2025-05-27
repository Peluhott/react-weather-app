import React, { useState } from 'react'

function CityInput({onCityChange}){
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        
        e.preventDefault();
        if(inputValue.trim()){
            onCityChange(inputValue.trim())
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            placeholder='Enter a City'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit'>Search</button>
        </form>
    );
}

export default CityInput;