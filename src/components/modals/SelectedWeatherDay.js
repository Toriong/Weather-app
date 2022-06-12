import React from 'react'
import { useContext } from 'react';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import { getTime } from '../../timeFns/getTime';
import { BsSunrise, BsSunset } from "react-icons/bs";
import WeatherIcon from '../weatherUI/WeatherIcon';
import WeatherTempTable from '../weatherUI/WeatherTempTable';
import useGetViewPortWidth from '../../customHooks/useGetViewPortWidth';
import { GrClose } from "react-icons/gr";
import { useEffect } from 'react';
import '../../css/comp-css/modals/selectedWeatherDay.css';



const SelectedWeatherDay = ({ closeModal }) => {
    const { _selectedWeatherDay, _targetLocation, _units } = useContext(WeatherInfoContext);
    const [units] = _units
    const [targetLocation,] = _targetLocation
    const [selectedWeatherDay] = _selectedWeatherDay;
    const { date, weather, feels_like, temp, averageForTheDay, humidity: humidityNum, dew_point, wind_speed, sunrise, sunset, isPresentDay, rain: rainMain, snow: snowMain } = selectedWeatherDay;

    const { weather: moreInfoWeather, temp: moreInfoTemp, humidity: humidityMoreInfoNum, wind_speed: windSpeedAverage, rain, snow, dewPoint, feels_like: feelsLikeAverage, temp: tempAverages, sunrise: sunriseProjected, sunset: sunsetProjected } = averageForTheDay ?? {};
    const { name: LocationName, timeZoneOffset } = targetLocation ?? {};
    const { max, min } = moreInfoTemp ?? {}
    const { description: moreInfoDescription, icon: moreInfoIcon } = moreInfoWeather?.[0] ?? {};
    const { icon: weatherIcon, description } = weather?.[0] ?? {};
    const { speed: speedUnits, temp: tempUnits } = units;
    let _description = description.charAt(0).toUpperCase() + description.slice(1);
    const { widthPixels } = useGetViewPortWidth()
    const weatherDayModalClassName = isPresentDay ? 'weatherDayModal presentDay' : 'weatherDayModal notPresentDay'

    const weatherDescriptionContainerCss = isPresentDay ? 'weatherDescriptionContainer presentDay' : 'weatherDescriptionContainer notPresentDay'

    if (!isPresentDay) {
        var { max: mainMax, min: mainMin, ..._temp } = temp ?? {};
        var _tempAverages = { ..._temp };
    }

    const tableData = { temp: isPresentDay ? tempAverages : _tempAverages, feelsLike: isPresentDay ? feelsLikeAverage : feels_like };
    const _sunrise = getTime(sunrise ?? sunriseProjected, timeZoneOffset, 'LT');
    const _sunset = getTime(sunset ?? sunsetProjected, timeZoneOffset, 'LT');


    if (moreInfoDescription) {
        var _moreInfoDescription = moreInfoDescription.charAt(0).toUpperCase() + moreInfoDescription.slice(1)
    }

    useEffect(() => {
        const touchMovePrevented = document.body.addEventListener('touchmove', event => { event.preventDefault() })
        document.body.style.position = 'fixed';
        document.body.style.overflow = 'visible';
        document.body.style.width = '100%';

        return () => {
            document.body.style.position = 'static';
            document.body.style.width = 'auto';
            document.body.style.overflow = 'visible';
            document.body.removeEventListener('touchmove', touchMovePrevented);
        }
    }, [widthPixels])

    useEffect(() => {
        window.addEventListener('touchstart', () => {
            console.log("'Unable to preventDefault inside passive event listener due to target being treated as passive' bug has been stopped.")
        }, { passive: false });
    }, [])

    return (
        <div className={weatherDayModalClassName} >
            <button id='closeModalBtn' onClick={closeModal}><GrClose /></button>
            <div>
                <section className='locationInfo'>
                    <span>{date}</span>
                    <span>{LocationName}</span>
                </section>
                <section className='weatherDescriptionSec1'>
                    <div>
                        <WeatherIcon weatherIcon={weatherIcon} />
                    </div>
                    <div className={weatherDescriptionContainerCss}>
                        {isPresentDay &&
                            <div className='currentWeatherInfo'>
                                <span>Current:</span>
                                <span className='infoTxt'>Temp is {Math.ceil(temp)}{tempUnits}.</span>
                                <span className='infoTxt'> {_description}. Feel likes {Math.ceil(feels_like)}{tempUnits}.</span>
                                <span className='infoTxt'>Humidity: {humidityNum}%</span>
                                <span className='infoTxt'>Dew point: {Math.ceil(dew_point)}{tempUnits}</span>
                                <span className='infoTxt'>Wind speed: {Math.ceil(wind_speed)} {speedUnits}</span>
                            </div>
                        }
                        <div className='averageForTheDay'>
                            <span>{isPresentDay ? 'Projections for the day:' : 'Projected forecast:'} </span>
                            {isPresentDay &&
                                <div className='presentDayDescription'>
                                    <WeatherIcon weatherIcon={moreInfoIcon} isIconSmaller />
                                    <span className='infoTxt'>{_moreInfoDescription}.</span>
                                </div>
                            }
                            <div className='projectedInfoSelectedWeatherDay'>
                                <span className='infoTxt'>The high {isPresentDay ? 'is ' : 'will be '} {Math.ceil(isPresentDay ? max : mainMax)}{tempUnits}. The low {isPresentDay ? 'is ' : 'will be '} {Math.ceil(isPresentDay ? min : mainMin)}{tempUnits}.</span>
                                <span className='infoTxt'>{_description}.</span>
                                <span className='infoTxt'>Humidity: {isPresentDay ? humidityMoreInfoNum : humidityNum}%</span>
                                {(rain || rainMain) && <span className='infoTxt'>Rain: {isPresentDay ? rain : rainMain}mm</span>}
                                {(snow || snowMain) && <span className='infoTxt'>Snow: {isPresentDay ? snow : snowMain}mm</span>}
                                <span className='infoTxt'>Dew point: {Math.ceil(isPresentDay ? dewPoint : dew_point)}{tempUnits}</span>
                                <span className='infoTxt'>Wind speed: {Math.ceil(isPresentDay ? windSpeedAverage : wind_speed)} {speedUnits}</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='tableSection'>
                    <WeatherTempTable data={tableData} isPresentDay={isPresentDay} />
                </section>
                <section className='sunriseAndSetSec'>
                    <div className='sunriseAndSetInfoContainer'>
                        <span className='infoTxt'>Sunrise</span>
                        <div className='sunriseAndSetTimeContainer'>
                            <div>
                                <BsSunrise id='sunriseIcon' />
                            </div>
                            <div>
                                <span className='infoTxt'>{_sunrise}</span>
                            </div>
                        </div>
                    </div>
                    <div className='sunriseAndSetInfoContainer'>
                        <span className='infoTxt'>Sunset</span>
                        <div className='sunriseAndSetTimeContainer'>
                            <div>
                                <BsSunset id='sunsetIcon' />
                            </div>
                            <div>
                                <span className='infoTxt'>{_sunset}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SelectedWeatherDay;