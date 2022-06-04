import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import '../../css/comp-css/modals/selectedWeatherDay.css';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import WeatherIcon from '../weatherUI/WeatherIcon';

// GOAL: present the following data on this modal:
// 

const SelectedWeatherDay = () => {
    const { _selectedWeatherDay, _targetLocation, _tempUnits, _units } = useContext(WeatherInfoContext);
    const [units] = _units
    const [targetLocation, setTargetLocation] = _targetLocation
    const [selectedWeatherDay] = _selectedWeatherDay;
    const { date, weather, feels_like, temp, averageForTheDay, humidity: humidityNum, dew_point, wind_speed } = selectedWeatherDay;
    const { weather: moreInfoWeather, temp: moreInfoTemp, humidity: humidityMoreInfoNum, sunrise, sunset, wind_speed: windSpeedAverage, rain, snow, dewPoint } = averageForTheDay ?? {};
    const { max, min } = moreInfoTemp ?? {}
    const { description: moreInfoDescription, icon: moreInfoIcon } = moreInfoWeather?.[0] ?? {};
    const { icon: weatherIcon, description } = weather?.[0] ?? {};
    const { speed: speedUnits, temp: tempUnits } = units;
    let _description = description.charAt(0).toUpperCase() + description.slice(1);



    if (moreInfoDescription) {
        var _moreInfoDescription = moreInfoDescription.charAt(0).toUpperCase() + moreInfoDescription.slice(1)
    }


    useEffect(() => {
        console.log('selectedWeatherDay: ', selectedWeatherDay);
        console.log('averageForTheDay: ', averageForTheDay)
    })

    return (
        <div className='weatherDayModal'>
            <section>
                <span>{date}</span>
                <span>{targetLocation.name}</span>
            </section>
            <section className='weatherDescriptionSec1'>
                <div>
                    <WeatherIcon weatherIcon={weatherIcon} />
                </div>
                <div className='descriptionContainer1'>
                    <div className='currentWeatherInfo'>
                        <span>Current:</span>
                        <span className='infoTxt'>Temp is {Math.round(temp)}{tempUnits}.</span>
                        <span className='infoTxt'> {_description}. Feel likes {Math.round(feels_like)}{tempUnits}.</span>
                        <span className='infoTxt'>Humidity: {humidityNum}%</span>
                        <span className='infoTxt'>Dew point: {Math.round(dew_point)}{tempUnits}</span>
                        <span className='infoTxt'>Wind speed: {Math.round(wind_speed)} {speedUnits}</span>
                    </div>
                    <div className='averageForTheDay'>
                        <span>Average for the day: </span>
                        <div>
                            <WeatherIcon weatherIcon={moreInfoIcon} isIconSmaller />
                            <span className='infoTxt'>{_moreInfoDescription}.</span>
                        </div>
                        <div>
                            <span className='infoTxt'>The high will be {Math.round(max)}{tempUnits}. The low will be {Math.round(min)}{tempUnits}.</span>
                            <span className='infoTxt'>Humidity: {humidityMoreInfoNum}%</span>
                            {rain && <span className='infoTxt'>Rain: {rain}mm</span>}
                            {snow && <span className='infoTxt'>Snow: {snow}mm</span>}
                            <span className='infoTxt'>Dew point: {Math.round(dewPoint)}{tempUnits}</span>
                            <span className='infoTxt'>Wind speed: {Math.round(windSpeedAverage)} {speedUnits}</span>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </section>
        </div>
    )
}

export default SelectedWeatherDay;