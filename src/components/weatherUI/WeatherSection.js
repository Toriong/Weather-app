import React, { useContext, useEffect } from 'react'
import { SearchContext } from '../../provider/SearchProvider';
import WeatherDayCard from './WeatherDayCard';
import { getDate } from '../../timeFns/getDate';
import '../../css/comp-css/weather-section/weatherSection.css'


const WeatherSection = ({ targetLocation }) => {
    const { _isWeatherDataReceived, _isLoadingScreenOn, _weather } = useContext(SearchContext);
    const [weather,] = _weather;
    const [isWeatherDataRecevied, setIsWeatherDataReceived] = _isWeatherDataReceived;
    const [isLoadingScreenOn, setIsLoadingScreenOn] = _isLoadingScreenOn;
    const { daily: dailyForecast, current: currentDay } = weather ?? {}
    console.log('dailyForecast: ', dailyForecast)
    const { name: targetLocationName, time: targetLocationTime } = targetLocation;



    useEffect(() => {
        console.log('weather: ', weather);
        console.log('targetLocation: ', targetLocation)
    })


    return (
        <section className='weatherSection'>
            {isLoadingScreenOn &&
                <span id="loadingWeatherTxt">Loading, please wait...</span>
            }
            {isWeatherDataRecevied &&
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
                        <WeatherDayCard isPresentDay day={currentDay} />
                    </section>
                    <section>
                        {/* {!!dailyForecast?.length &&
                            dailyForecast.map((day, index) => <WeatherDayCard day={day} index={index} />)
                        } */}
                    </section>
                </>
            }
        </section>
    )
}

export default WeatherSection