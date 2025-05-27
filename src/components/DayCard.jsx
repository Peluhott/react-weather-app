import React from 'react'
import './DayCard.css'

function DayCard({ day }) {


    const { datetime, temp, icon, tempmax, tempmin, conditions } = day;
    const iconUrl = `/icons/${icon}.svg`;
    const weekday = new Date(datetime).toLocaleDateString("en-us", { weekday: "long" });
    const firstCondition = conditions.split(',')[0];

    return (
        <div className='weatherCard'>
            <p className='day'>{weekday}</p>
            <p className='temp'>{temp}</p>
            <img className='icon' src={iconUrl} alt={conditions} />
            <p className='weather'>{firstCondition}</p>
            <div className='temps'>
                <div className='temp-container'>
                    <p className='Hi'>Hi {tempmax}</p>
                    <img className='temp-icon' src='./icons/high.svg' alt='high' />
                </div>
                <div className='temp-container'>
                    <p className='Low'>Low {tempmin}</p>
                    <img className='temp-icon' src='./icons/low.svg' alt='low' />
                </div>

            </div>


        </div>
    );
}

export default DayCard;