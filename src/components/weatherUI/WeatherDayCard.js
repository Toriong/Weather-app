import React, { useContext } from 'react'
import { getDate } from '../../timeFns/getDate';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import '../../css/comp-css/weather-section/weatherDayCard.css'
import { ModalContext } from '../../provider/ModalProvider';
import WeatherIcon from './WeatherIcon';
import { useEffect } from 'react';

const WeatherDayCard = ({ index, day, isPresentDay }) => {
    const { _currentDate, _isCelsius, _selectedWeatherDay, _units } = useContext(WeatherInfoContext);
    const { _isSelectedWeatherModalOn } = useContext(ModalContext);
    const [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn] = _isSelectedWeatherModalOn;
    const [selectedWeatherDay, setSelectedWeatherDay] = _selectedWeatherDay;
    const [isCelsius, setIsCelsisu] = _isCelsius;
    const [currentDate, setCurrentDate] = _currentDate;
    const { temp: tempUnits } = _units[0];
    const date = isPresentDay ? currentDate : getDate(index + 1);
    const { weather, feels_like, averageForTheDay, temp } = day;
    const { min, max } = averageForTheDay?.temp ?? temp;
    console.log('day: ', day)
    const { icon: weatherIcon, description } = weather[0] ?? {};
    const weatherDayCard = isPresentDay ? 'weatherDayCard' : 'weatherDayCard daily'

    const handleWeatherDayClick = () => {
        setIsSelectedWeatherModalOn(true);
        setSelectedWeatherDay({ ...day, date, isPresentDay: isPresentDay });
    };

    useEffect(() => {
        isPresentDay && console.log('hello bacon and steak: ', day)
    })


    // BUG:
    // WHAT IS HAPPENING: when the current day is presented onto the screen, the num for the degrees is appearing as 'NaN'


    return (
        <div className={weatherDayCard} onClick={handleWeatherDayClick}>
            <section>
                <h1>{date}</h1>
            </section>
            <section className='weatherDayCardIcon'>
                <WeatherIcon weatherIcon={weatherIcon} />
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