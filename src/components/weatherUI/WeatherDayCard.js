import React, { useContext } from 'react'
import { getDate } from '../../timeFns/getDate';
import '../../css/comp-css/weather-section/weatherDayCard.css'
import { SearchContext } from '../../provider/SearchProvider';

const WeatherDayCard = ({ index, day, isPresentDay }) => {
    const { _currentDate } = useContext(SearchContext);
    const [currentDate, setCurrentDate] = _currentDate;
    const date = isPresentDay ? currentDate : getDate(index + 1);

    return (
        <div className='weatherDayCard'>
            <section>
                <h1>{date}</h1>
            </section>
        </div>
    )
}

export default WeatherDayCard