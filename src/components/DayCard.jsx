import React from 'react'

function DayCard({day}){

    const { date, weather, icon, high, low } = day;
    const weekday = new Date(day.date).toLocaleDateString("en-us",{weekday: "long"});

return (
    <div className='weatherCard'>
            <p className='day'>{weekday}</p>
            <img className='icon' src={icon} alt={weather}/>
            <p className='weather'>{weather}</p>
            <div className='temps'>
                <p className='hi'>{high}</p>
                <p className='low'>{low}</p>
            </div>


    </div>
);
}