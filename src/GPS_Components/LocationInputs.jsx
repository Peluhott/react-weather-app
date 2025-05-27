import React, { useState } from 'react'

function LocationInput({OnLocationChange}){

    const [depart, setDepart] = useState('')
    const [arrive, setArrive] = useState('')

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
            <input
            type='text'
            placeholder='Enter Depart'
            value={depart}
            onChange= {(e) => setDepart(e.target.value)}
            />

            <input
            type='text'
            placeholder='Enter Arrival'
            value={arrive}
            onChange={(e) => setArrive(e.target.value)}
            />

            <button type='submit'>Enter</button>
        </form>
    )

}