import React from 'react'
import './DayCard.css'

function DayCard({day}){
   

    const { datetime, description, icon, tempmax, tempmin,conditions } = day;
    const iconUrl = `/icons/${icon}.svg`;
    const weekday = new Date(datetime).toLocaleDateString("en-us",{weekday: "long"});

return (
    <div className='weatherCard'>
            <p className='day'>{weekday}</p>
            <img className='icon' src={iconUrl} alt={conditions}/>
            <p className='weather'>{description}</p>
            <div className='temps'>
                <p className='hi'>{tempmax}</p>
                <p className='low'>{tempmin}</p>
            </div>


    </div>
);
}

export default DayCard;