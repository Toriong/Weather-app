import React, { useEffect } from 'react'
import { getGeoCode } from '../../apiFns/getGeoCode';
import { getUserCityName } from '../../apiFns/getUserCityName';
import { getWeather } from '../../apiFns/getWeather'

const SearchBtn = ({ placeHolderTxt, userLocation }) => {

    const getUserLocationWeather = () => {
        const weather = getWeather(userLocation);
        console.log('weather: ', weather)
    };





    // GOAL: if placeholderTxt is x, then use y fn that will handle the onClick of the search Btn

    // CASE: the placeholder is 'Using your location. Press 'search' icon to see results.'

    const isOnUserLocationSearch = placeHolderTxt === "Using your location. Press the 'search' icon to get results"


    if (isOnUserLocationSearch) {
        var handleSearchBtnClick = () => {
            navigator?.geolocation ? getUserLocationWeather() : alert("Geolocation is not supported by this browser.")
            getUserCityName(userLocation).then(response => {
                const { isError, data } = response;
                if (isError) {
                    alert('An error has occurred, cannot display location of user.')
                    return;
                };

                console.log('data: ', data);
            })
        }
    }
    return (
        <button
            disabled={isOnUserLocationSearch && !navigator?.geolocation}
            onClick={handleSearchBtnClick}
        >
            Search
        </button>
    )
}

export default SearchBtn