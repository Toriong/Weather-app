import React, { useContext, useEffect } from 'react'
import { SearchContext } from '../../provider/SearchProvider';
import WeatherDayCard from './WeatherDayCard';
import { getDate } from '../../timeFns/getDate';
import '../../css/comp-css/weather-section/weatherSection.css'

// GOAL:
// create the weather section for the UI:
// will have the header for the section that will display the label that is in the input
// will have weather card section: this section will display the 7 day forecast for each day, each day will presented onto a card that wil consist of the following:



// GOAL:
// have the date appear on every single weather card day on the UI

// the date for each card is on

const WeatherSection = ({ targetLocation, weather }) => {
    const { _isWeatherDataReceived, _isLoadingScreenOn } = useContext(SearchContext);
    const [isWeatherDataRecevied, setIsWeatherDataReceived] = _isWeatherDataReceived;
    const [isLoadingScreenOn, setIsLoadingScreenOn] = _isLoadingScreenOn;
    const { daily: dailyForecast, current: currentDay } = weather ?? {}
    const { name: targetLocationName, time: targetLocationTime } = targetLocation;



    useEffect(() => {
        console.log('weather: ', weather);
        console.log('targetLocation: ', targetLocation)
    })

    // GOAL: the following will be displayed onto the DOM:
    // the date 
    // the temperature
    // the animation depending on the weather type (EXAMPLE: if the cloudy, then show a cloudy animation)  

    // GOAL: get the date for each day in the weather forecast 
    // the date is displayed for each weather dayps
    // the date is converted into letters instead of numbers (June 1, 2022)
    // for each weather card, get the target date in miliseconds 
    // store the current date into currentDate  






    // GOAL: get the object that is stored in the current field

    // GOAL: display the loading screen when the user presses the search button 

    // GOAL: when the user receives the results, don't show the loading screen, present the weather data onto the UI 


    // GOAL: when the user presses the searchBtn, show the loading screen, once date has been received from the api, set wasWeatherDateReceived to true
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