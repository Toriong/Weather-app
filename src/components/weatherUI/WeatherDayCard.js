import React, { useContext } from 'react'
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import { ModalContext } from '../../provider/ModalProvider';
import { getTime } from '../../timeFns/getTime'
import WeatherIcon from './WeatherIcon';
import '../../css/comp-css/weather-section/weatherDayCard.css'
import { useEffect } from 'react';

const WeatherDayCard = ({ day, isPresentDay, index }) => {
    const { _selectedWeatherDay, _units, _targetLocation } = useContext(WeatherInfoContext);
    const { _isSelectedWeatherModalOn } = useContext(ModalContext);
    const [targetLocation] = _targetLocation
    const [, setIsSelectedWeatherModalOn] = _isSelectedWeatherModalOn;
    const [, setSelectedWeatherDay] = _selectedWeatherDay;
    const { temp: tempUnits } = _units[0];
    const { weather, feels_like, averageForTheDay, temp, dt } = day ?? {};

    useEffect(() => {
        console.log('day: ', day)
    })


    const date = getTime(dt, targetLocation.timeZoneOffset, 'dddd, MMM Do YYYY')
    const { min, max } = averageForTheDay?.temp ?? temp;
    const { icon: weatherIcon, description } = weather[0] ?? {};
    const weatherDayCardCss = isPresentDay ? 'weatherDayCard presentDay' : 'weatherDayCard daily'
    const weatherDescriptionSecCss = isPresentDay ? 'weatherDescriptionSec' : 'weatherDescriptionSec daily'

    const handleWeatherDayClick = () => {
        setIsSelectedWeatherModalOn(true);
        setSelectedWeatherDay({ ...day, date, isPresentDay: isPresentDay });
    };


    return (
        <div className={weatherDayCardCss} onClick={handleWeatherDayClick} key={index}>
            <section>
                <h1>{date}</h1>
            </section>
            <section className='weatherDayCardIcon'>
                <WeatherIcon weatherIcon={weatherIcon} />
            </section>
            <section className={weatherDescriptionSecCss}>
                {isPresentDay &&
                    <>
                        <span>Current temp:</span>
                        <span>{Math.ceil(temp)} {tempUnits}</span>
                    </>
                }
                {isPresentDay ?
                    <span>Feels like {Math.ceil(feels_like)} {tempUnits}. <span className='weatherDescription'>{description}.</span></span>
                    :
                    <span>{description}</span>
                }
            </section>
            <section className='highAndLowTempSection'>
                <div>
                    <span>High:</span>
                    <span>{Math.ceil(max)} {tempUnits}</span>
                </div>
                <div>
                    <span>Low:</span>
                    <span>{Math.ceil(min)} {tempUnits}</span>
                </div>
            </section>
        </div>
    )
}
export default WeatherDayCard;