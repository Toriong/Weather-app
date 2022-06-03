import React, { useContext } from 'react'
import { getDate } from '../../timeFns/getDate';
import { SearchContext } from '../../provider/SearchProvider';
import '../../css/comp-css/weather-section/weatherDayCard.css'

const WeatherDayCard = ({ index, day, isPresentDay }) => {
    const { _currentDate, _isCelsius } = useContext(SearchContext);
    const [isCelsius, setIsCelsisu] = _isCelsius;
    const [currentDate, setCurrentDate] = _currentDate;
    const date = isPresentDay ? currentDate : getDate(index + 1);
    const { weather, feels_like, wind_gust, moreInfo, dew_point, temp } = day;
    const tempUnits = isCelsius ? '°C' : '°F'
    const { min, max } = moreInfo.temp;
    console.log('day: ', day)
    const { icon: weatherIcon, description } = weather[0] ?? {};
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`


    return (
        <div className='weatherDayCard'>
            <section>
                <h1>{date}</h1>
            </section>
            <section className='weatherDayCardIcon'>
                <img
                    src={weatherIconUrl}
                    alt={"weather_icon"}
                    className='weatherIcon'
                />
            </section>
            <section className='weatherDescriptionSec'>
                {isPresentDay &&
                    <>
                        <span>Current temp:</span>
                        <span>{Math.round(temp)} °F</span>
                    </>
                }
                {isPresentDay ?
                    <span>Feels like {Math.round(feels_like)} {tempUnits}. <span className='weatherDescription'>{description}.</span></span>
                    :
                    <span>{description}</span>
                }
            </section>
            <section className='highAndLowTempSection'>
                <div>
                    <span>High:</span>
                    <span>{Math.round(max)} {tempUnits}</span>
                </div>
                <div>
                    <span>Low:</span>
                    <span>{Math.round(min)} {tempUnits}</span>
                </div>
            </section>
        </div>
    )
}
export default WeatherDayCard