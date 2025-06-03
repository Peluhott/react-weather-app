import React, { useState, useEffect, useRef } from 'react' // change this whole class into a CommuteForm





function CommuteForm({OnCommuteSubmit}){
    const debounceTimeoutRef = useRef(null)
    const API_KEY = import.meta.env.VITE_LOCATION_KEY;
    
    
    const [depart, setDepart] = useState('')
    const [arrive, setArrive] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [selectedDays, setSelectedDays] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [activeField, setActiveField] = useState('')
    const [query, setQuery] = useState('')

    const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    
    
    useEffect(() => {
        if(!query){
            setSuggestions([]);
            return;
        }
        if(query.length < 3) {
            setSuggestions([]);
            return;
        }

        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = setTimeout(() => {
            fetch(`https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${API_KEY}&limit=5`)
        .then((res) => res.json())
        .then((data) => {
            setSuggestions(data.results || []);
        });

        }, 300);
        return () => clearTimeout(debounceTimeoutRef.current);
}, [query, API_KEY]);

const handleInputChange = (field, value) => {
    setActiveField(field);
    setQuery(value);
    

    if (field === 'depart') setDepart(value);
    else setArrive(value);
};

const handleSuggestionClick = (s) => {
    if(activeField === 'depart') setDepart(s);
    else setArrive(s)
    setSuggestions([]);
    setQuery('')
}

const toggleDay = (day) => {
    setSelectedDays(prev => 
        prev.includes(day)
        ? prev.filter(d => d !== day) : [...prev, day]
    );
}
    

    const handleSubmit = (e) => {
         e.preventDefault();
        if(!depart || !arrive || !departureDate || departureTime || selectedDays === 0){
            alert('please fill out all fields');
            return;
        }
       
        OnCommuteSubmit({depart, arrive, departureDate, departureTime, days: selectedDays});
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
          <div className="days">
                <label>Repeat Every Week On:</label>
                <div className="day-checkboxes">
                    {weekdays.map((day) => (
                        <label key={day}>
                            <input
                                type="checkbox"
                                value={day}
                                checked={selectedDays.includes(day)}
                                onChange={() => toggleDay(day)}
                            />
                            {day}
                        </label>
                    ))}
                </div>
            </div>
            <button type='submit'>Enter</button>
        </form>
    );

}
export default CommuteForm;