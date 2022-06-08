import React, { useContext, useEffect } from 'react'
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import WeatherDayCard from './WeatherDayCard';
import { getDate } from '../../timeFns/getDate';
import '../../css/comp-css/weather-section/weatherSection.css'


const WeatherSection = () => {
    const { _isWeatherDataReceived, _isLoadingScreenOn, _weather, _targetLocation } = useContext(WeatherInfoContext);
    const [weather,] = _weather;
    const [targetLocation, setTargetLocation] = _targetLocation;
    const [isWeatherDataReceived, setIsWeatherDataReceived] = _isWeatherDataReceived;
    const [isLoadingScreenOn, setIsLoadingScreenOn] = _isLoadingScreenOn;
    const { daily: dailyForecast, current: currentDay } = weather ?? {}
    const { name: targetLocationName, time: targetLocationTime } = targetLocation ?? {};


    const weatherSectionClassName = isLoadingScreenOn ? 'weatherSection loading' : 'weatherSection';


    return (
        <section className={weatherSectionClassName}>
            {isLoadingScreenOn &&
                <span id="loadingWeatherTxt">Loading, please wait...</span>
            }
            {isWeatherDataReceived &&
                <>
                    <header>
                        <span>{targetLocationTime}</span>
                        <span>{targetLocationName}</span>

                        {/* put the following in this element: */}
                        {/* the location that the user searched for targetlocation.name*/}
                        {/* the time of the search: 'The weather as of targetLocation.time' */}
                    </header>
                    <section id='currentDaySection'>
                        {/* put the current date here */}
                        {currentDay && <WeatherDayCard isPresentDay day={currentDay} />}
                    </section>
                    <section className='dailyForecastContainer'>
                        {!!dailyForecast?.length &&
                            dailyForecast.map((day, index) => <WeatherDayCard day={day} index={index} />)
                        }
                    </section>
                </>
            }
        </section>
    )
}

export default WeatherSection;