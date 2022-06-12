import React, { useContext } from 'react'
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import WeatherDayCard from './WeatherDayCard';
import '../../css/comp-css/weather-section/weatherSection.css'
import ResetSearch from '../buttons/ResetSearch';
import useGetViewPortWidth from '../../customHooks/useGetViewPortWidth';
import { ModalContext } from '../../provider/ModalProvider';
import { useEffect } from 'react';
import { getTime } from '../../timeFns/getTime';
import moment from 'moment';




const WeatherSection = () => {
    const { _isWeatherDataReceived, _isLoadingScreenOn, _weather, _targetLocation } = useContext(WeatherInfoContext);
    const { _isSelectedWeatherModalOn } = useContext(ModalContext);
    const [isSelectedWeatherModalOn] = _isSelectedWeatherModalOn
    const [weather,] = _weather;
    const [targetLocation,] = _targetLocation;
    const [isWeatherDataReceived,] = _isWeatherDataReceived;
    const [isLoadingScreenOn,] = _isLoadingScreenOn;
    const { daily: dailyForecast, current: currentDay } = weather ?? {}
    const { name: targetLocationName, time: targetLocationTime } = targetLocation ?? {};
    const weatherSectionClassName = isLoadingScreenOn ? 'weatherSection loading' : 'weatherSection';
    const { widthPixels } = useGetViewPortWidth();

    useEffect(() => {
        console.log('date in milliSeconds: ', moment(targetLocationTime).format('x'))
    })

    return (
        <section className={weatherSectionClassName} style={{ touchAction: isSelectedWeatherModalOn ? 'none' : 'auto' }}>
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
                    {(widthPixels > 767) && <ResetSearch resetBtnCss={'resetBtn notOnMobile'} />}
                </>
            }
        </section>
    )
}

export default WeatherSection;