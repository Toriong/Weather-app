import React from 'react'
import { getWeather } from '../../apiFns/getWeather'

const SearchBtn = ({ placeHolderTxt, userLocation }) => {



    const getUserLocationWeather = () => {
        const { longitude, latitude } = userLocation;
        const weather = getWeather({ longitude, latitude });
        console.log('weather: ', weather)
    }

    // GOAL: if placeholderTxt is x, then use y fn that will handle the onClick of the search Btn

    // CASE: the placeholder is 'Using your location. Press 'search' icon to see results.'



    if (placeHolderTxt === "Using your location. Press the 'search' icon to get results") {
        var handleSearchBtnClick = () => {
            navigator?.geolocation ? getUserLocationWeather() : alert("Geolocation is not supported by this browser.")
        }
    }
    return (
        <button onClick={handleSearchBtnClick}>Search</button>
    )
}

export default SearchBtn