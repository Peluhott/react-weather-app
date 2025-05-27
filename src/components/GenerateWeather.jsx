
import DayCard from './DayCard'

function GenerateWeather({forecast, daysToShow}){



return (
    <div className='forecast-container'>
        {forecast.slice(0, daysToShow).map(day => (
            <DayCard
                key={day.datetime}
                day={day} />
        ))}


    </div>
);
}
export default GenerateWeather;