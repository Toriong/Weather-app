import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { getWeather } from '../../apiFns/getWeather';
import { ModalContext } from '../../provider/ModalProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider'
import { getDate } from '../../timeFns/getDate';
import { getTimeOfLocation } from '../../timeFns/getTimeOfLocation';

const UnitTypesBtns = ({ setIsUnitsSelectionModalOn }) => {
    const { _units, _isWeatherDataReceived, _isLoadingScreenOn, _weather, _currentDate, _targetLocation, _longAndLatOfDisplayedWeather } = useContext(WeatherInfoContext)
    const { _isSearchAndUnitTypesModalOn } = useContext(ModalContext);
    const [, setIsSearchAndUnitTypesModalOn] = _isSearchAndUnitTypesModalOn;
    const [longAndLatOfDisplayedWeather] = _longAndLatOfDisplayedWeather;
    const [weather, setWeather] = _weather;
    const [currenetDate, setCurrentDate] = _currentDate;
    const [targetLocation, setTargetLocation] = _targetLocation;
    const [units, setUnits] = _units;
    const [isWeatherDataReceived, setIsWeatherDataReceived] = _isWeatherDataReceived;
    const [isLoadingScreenOn, setIsLoadingScreenOn] = _isLoadingScreenOn;
    const [alertTimer, setAlertTimer] = useState(null);
    const [willClearTimer, setWillClearTimer] = useState(false);


    const handleUnitsTypeBtnClick = event => {
        const { name: btnName } = event.target;
        const wasImperialUnitsChosen = btnName === 'imperial';
        const _units = { temp: wasImperialUnitsChosen ? '°F' : '°C', speed: wasImperialUnitsChosen ? 'mph' : 'm/s' }
        setUnits(_units);
        setIsUnitsSelectionModalOn ? setIsUnitsSelectionModalOn(false) : setIsSearchAndUnitTypesModalOn(false);
        if (isWeatherDataReceived) {
            setIsWeatherDataReceived(false);
            setIsLoadingScreenOn(true);
            setUnits(_units);
            setWeather(null);
            const alertTimer = setTimeout(() => {
                alert('Sorry, but it looks like it is taking longer than usually getting weather data. Please refresh the page and try again.')
            }, 15000)
            getWeather(longAndLatOfDisplayedWeather, wasImperialUnitsChosen).then(response => {
                clearTimeout(alertTimer);
                console.log('hello there world')
                const { weather, didError, errorMsg } = response;
                if (didError) {
                    console.error('An error has occurred in getting weather of target location. Error message: ', errorMsg);
                    alert('An error has occurred in getting weather of target location.')
                    return;
                };

                if (!weather) {
                    alert('Something went wrong, please refresh the page and try again.')
                    return;
                }
                const { daily, timezone, current } = weather;
                const { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dew_point } = daily[0];
                daily.shift();
                daily.pop();
                setWeather({ daily, current: { ...current, averageForTheDay: { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dewPoint: dew_point } } })
                setCurrentDate(getDate())
                setTargetLocation(targetLocation => {
                    return {
                        ...targetLocation,
                        time: getTimeOfLocation(timezone),
                    }
                });
                setIsLoadingScreenOn(false);
                setIsWeatherDataReceived(true);
            })
        };
    };



    return (
        <>
            <button name='imperial' onClick={event => { handleUnitsTypeBtnClick(event); }}>{'Imperial (°F, mph)'}</button>
            <button name='metric' onClick={event => { handleUnitsTypeBtnClick(event); }}>{'Metric (°C, m/s)'}</button>
        </>
    )
}

export default UnitTypesBtns