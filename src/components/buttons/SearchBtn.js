import React, { useEffect } from 'react'
import { getGeoCode } from '../../apiFns/getGeoCode';
import { getLocationTime } from '../../apiFns/getLocationTime';
import { getUserCityName } from '../../apiFns/getUserCityName';
import { getWeather } from '../../apiFns/getWeather'

const SearchBtn = ({ placeHolderTxt, userLocation, setTimeOfLocation, setWeatherOfDays }) => {

    const _getWeather = () => {
        getWeather(userLocation)
            .then(response => {
                const { weather, didError } = response;
                if (didError) {
                    console.error('An error has occurred in getting weather of target location.')
                    alert('An error has occurred in getting weather of target location.')
                    return;
                };
                weather?.daily?.length ? setWeatherOfDays(weather.daily.slice(0, weather.daily.length - 1)) : setWeatherOfDays(weather.daily);
            })

    };

    const isOnUserLocationSearch = placeHolderTxt === "Using your location. Press the 'search' icon to get results"


    if (isOnUserLocationSearch) {
        var handleSearchBtnClick = () => {
            navigator?.geolocation ? _getWeather() : alert("Geolocation is not supported by this browser.")
            getUserCityName(userLocation).then(response => {
                const { isError, data } = response;
                if (isError) {
                    alert('An error has occurred, cannot display location of user.')
                    return;
                };

                console.log('data: ', data);
            });
            getLocationTime(userLocation)
                .then(data => {
                    const { didError, time } = data;
                    if (didError) {
                        console.error('An error has occurrerd in getting the time of target location.')
                        return;
                    }
                    setTimeOfLocation(time);
                })
        }
    } else if (placeHolderTxt === 'Search by address, city name, or zip code') {
        // GOAL: get the weather results based on the geocodes of the user's input that the user entered 
        handleSearchBtnClick = () => { _getWeather() };
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