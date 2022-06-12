import React from 'react'
import '../../css/comp-css/weather-section/weatherIcon.css'




const WeatherIcon = ({ weatherIcon, isIconSmaller }) => {
    const getIconSrc = weatherIcon => `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const weatherIconUrl = getIconSrc(weatherIcon);
    const _className = isIconSmaller ? 'weatherIcon small' : 'weatherIcon normal';

    return <img
        src={weatherIconUrl}
        alt={"weather_icon"}
        className={_className}
    />
}

export default WeatherIcon