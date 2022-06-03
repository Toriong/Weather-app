import React, { useContext } from 'react'
import { getDate } from '../../timeFns/getDate';
import { SearchContext } from '../../provider/SearchProvider';
import '../../css/comp-css/weather-section/weatherDayCard.css'

const WeatherDayCard = ({ index, day, isPresentDay }) => {
    const { _currentDate } = useContext(SearchContext);
    const [currentDate, setCurrentDate] = _currentDate;
    const date = isPresentDay ? currentDate : getDate(index + 1);
    const { weather } = day;
    const { icon: weatherIcon, description } = weather[0] ?? {};
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    console.log('day: ', day)


    return (
        <div className='weatherDayCard'>
            <section>
                <h1>{date}</h1>
            </section>
            <section>
                <img
                    src={weatherIconUrl}
                    alt={"weather_icon"}
                    className='weatherIcon'
                />
            </section>
        </div>
    )
}
export default WeatherDayCard