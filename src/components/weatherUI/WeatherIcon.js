import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import '../../css/comp-css/weather-section/weatherIcon.css'
import { getDayOrNightIcon } from '../../iconFns/getDayOrNightIcon';
import { getIcon } from '../../iconFns/getIcon';




const WeatherIcon = ({ weatherIcon, isIconSmaller, description, isPresentDay, currentDayTimes, isMidnightSun, isPolarNight }) => {
    const getIconSrc = weatherIcon => `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const weatherIconUrl = getIconSrc(weatherIcon);
    const [iconSrc, setIconSrc] = useState(weatherIconUrl);
    const [willHandleError, setWillHandleError] = useState(false)
    const _className = isIconSmaller ? 'weatherIcon small' : 'weatherIcon normal';

    useEffect(() => {
        if (willHandleError) {
            const iconString = getIcon(description);
            const isDCharAtEndOfString = iconString.slice(-1) === 'd';
            if (isDCharAtEndOfString && !isPresentDay) {
                alert('ERROR! Not on present day.')
                setIconSrc(getIconSrc(iconString))
            } else {
                alert('ERROR! On present day.')
                const _iconString = getDayOrNightIcon(iconString, currentDayTimes, isMidnightSun, isPolarNight, isPresentDay);
                setIconSrc(getIconSrc(_iconString))
            }
            setWillHandleError(false);
        }
    }, [willHandleError])


    return <img
        src={iconSrc}
        alt={"error_"}
        onError={() => {
            setWillHandleError(true);
        }}
        className={_className}
    />
}

export default WeatherIcon