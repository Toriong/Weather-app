import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import '../../css/comp-css/weather-section/weatherIcon.css'
import { getDayOrNightIcon } from '../../iconFns/getDayOrNightIcon';
import { getIcon } from '../../iconFns/getIcon';




const WeatherIcon = ({ weatherIcon, isIconSmaller, description, isPresentDay, currentDayTimes, isMidnightSun, isPolarNight }) => {
    const getIconSrc = weatherIcon => `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const weatherIconUrl = getIconSrc(weatherIcon);
    const _className = isIconSmaller ? 'weatherIcon small' : 'weatherIcon normal';


    return <img
        src={weatherIconUrl}
        alt={'error_'}
        onError={event => {
            const iconString = getIcon(description);
            const isDCharAtEndOfString = iconString.slice(-1) === 'd';
            if (isDCharAtEndOfString && !isPresentDay) {
                event.target.src = getIconSrc(iconString)
            } else {
                const _iconString = getDayOrNightIcon(iconString, currentDayTimes, isMidnightSun, isPolarNight, isPresentDay);
                event.target.src = getIconSrc(_iconString)
            }
        }}
        className={_className}
    />

}

export default WeatherIcon