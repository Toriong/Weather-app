import React, { useEffect } from 'react'
import { getGeoCode, getReverseGeoCode } from '../../apiFns/getGeoCode';
import { getLocationTime } from '../../apiFns/getLocationTime';
import { getUserCityName } from '../../apiFns/getUserCityName';
import { getWeather } from '../../apiFns/getWeather'



const SearchBtn = ({ placeHolderTxt, userLocation, setTargetLocation, setWeatherOfDays, searchInput }) => {

    const getTimeOfLocation = offset => {
        // create Date object for current location
        const currentDate = new Date();

        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        const utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        const timeOfTargetLocation = new Date(utc + (3600000 * offset));

        // return time as a string
        return timeOfTargetLocation;
    }

    const _getWeather = () => {
        getWeather(userLocation)
            .then(response => {
                const { weather, didError } = response;
                if (didError) {
                    console.error('An error has occurred in getting weather of target location.')
                    alert('An error has occurred in getting weather of target location.')
                    return;
                };
                const { daily, timezone_offset } = weather;
                daily?.length ? setWeatherOfDays(weather.daily.slice(0, weather.daily.length - 1)) : setWeatherOfDays(weather.daily);
                // GOAL: get the time of the target location and display it onto the DOM
                setTargetLocation(targetLocation => {
                    return {
                        ...targetLocation,
                        name: searchInput,
                        time: getTimeOfLocation(timezone_offset)
                    }
                })
            })

    };

    const isOnUserLocationSearch = placeHolderTxt === "Using your location. Press the 'search' icon to get results"


    // GOAL: show the location that the user search for in the weather section



    // CASE 1: the user is using there own location 
    // GOAL: display the user's current location when the user presses the search button 
    // the user's current location is displayed in the weather section 
    // the user location is passed as the argument for setSearchedLocation
    // this value is the user's current location 
    // get the value that value that has the highest confidence rating


    // CASE 2: the user is using the location that they searched for in the input
    // GOAL: display the location that is in the input in the weather section when user presses the search button 
    // the location that the user search for is displayed onto the dom 
    // the location in the array that has the highest confidence is displayed is passed for the fn setSearchedLocation
    // get the array that is returned from getReverseGeoCode
    // using the long and lat of the selected location, pass those values as the argument for getReverseGeoCode




    if (isOnUserLocationSearch) {
        var handleSearchBtnClick = () => {
            navigator?.geolocation ? _getWeather() : alert("Geolocation is not supported by this browser.");
            getReverseGeoCode(userLocation).then(data => console.log('current user location: ', data));
            // getLocationTime(userLocation)
            //     .then(data => {
            //         const { didError, time } = data;
            //         if (didError) {
            //             console.error('An error has occurrerd in getting the time of target location.')
            //             return;
            //         }
            //         setTimeOfLocation(time);
            //     })
        }
    } else if (placeHolderTxt === 'Search by address, city name, or zip code') {
        handleSearchBtnClick = () => {
            _getWeather()
        };

        // GOAL: when the clicks on the search button, get the following:
        // the target location name that the user search for 
        // the time of that location
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