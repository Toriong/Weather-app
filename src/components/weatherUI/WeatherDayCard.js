import React, { useContext } from 'react'
import { getDate } from '../../timeFns/getDate';
import { SearchContext } from '../../provider/SearchProvider';
import '../../css/comp-css/weather-section/weatherDayCard.css'

const WeatherDayCard = ({ index, day, isPresentDay }) => {
    const { _currentDate, _isCelsius, _selectedWeatherDay } = useContext(SearchContext);
    const [selectedWeatherDay, setSelectedWeatherDay] = _selectedWeatherDay;
    const [isCelsius, setIsCelsisu] = _isCelsius;
    const [currentDate, setCurrentDate] = _currentDate;
    const date = isPresentDay ? currentDate : getDate(index + 1);
    const { weather, feels_like, moreInfo, temp } = day;
    const tempUnits = isCelsius ? '°C' : '°F'
    const { min, max } = moreInfo?.temp ?? temp;
    console.log('day: ', day)
    const { icon: weatherIcon, description } = weather[0] ?? {};
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const weatherDayCard = isPresentDay ? 'weatherDayCard' : 'weatherDayCard daily'

    const handleWeatherDayClick = () => { setSelectedWeatherDay(day); };


    return (
        <div className={weatherDayCard} onClick={handleWeatherDayClick}>
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
export default WeatherDayCard;