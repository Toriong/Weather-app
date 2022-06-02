import React from 'react'
import { getDate } from '../../timeFns/getDate';

const WeatherDayCard = ({ index, day }) => {
    const date = getDate(index + 1);
    console.log('day, weather: ', day)
    return (
        <div className='weatherDayCard'>
            <h1>{date}</h1>
        </div>
    )
}

export default WeatherDayCard