import React, { useContext } from 'react'
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import WeatherDayCard from './WeatherDayCard';
import '../../css/comp-css/weather-section/weatherSection.css'


const WeatherSection = () => {
    const { _isWeatherDataReceived, _isLoadingScreenOn, _weather, _targetLocation } = useContext(WeatherInfoContext);
    const [weather,] = _weather;
    const [targetLocation,] = _targetLocation;
    const [isWeatherDataReceived,] = _isWeatherDataReceived;
    const [isLoadingScreenOn,] = _isLoadingScreenOn;
    const { daily: dailyForecast, current: currentDay } = weather ?? {}
    const { name: targetLocationName, time: targetLocationTime } = targetLocation ?? {};
    const weatherSectionClassName = isLoadingScreenOn ? 'weatherSection loading' : 'weatherSection';

    return (
        <section className={weatherSectionClassName}>
            {isLoadingScreenOn && <span id="loadingWeatherTxt">Loading, please wait...</span>}
            {isWeatherDataReceived &&
                <>
                    <header>
                        <span>{targetLocationTime}</span>
                        <span>{targetLocationName}</span>
                    </header>
                    <section id='currentDaySection'>
                        {currentDay && <WeatherDayCard isPresentDay day={currentDay} index={currentDay.dt} />}
                    </section>
                    <section className='dailyForecastContainer'>
                        {!!dailyForecast?.length && dailyForecast.map((day, index) => <WeatherDayCard day={day} index={index} />)}
                    </section>
                </>
            }
        </section>
    )
}

export default WeatherSection;