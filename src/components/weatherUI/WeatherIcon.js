import React from 'react'
import '../../css/comp-css/weather-section/weatherIcon.css'



const WeatherIcon = ({ weatherIcon, isIconSmaller }) => {
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const _className = isIconSmaller ? 'weatherIcon small' : 'weatherIcon normal';

    return <img
        src={weatherIconUrl}
        alt={"weather_icon"}
        className={_className}
    />
}

export default WeatherIcon