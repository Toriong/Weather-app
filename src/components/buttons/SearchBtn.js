import React, { useContext, useEffect } from 'react'
import { getUserCityName } from '../../apiFns/getUserCityName';
import { getWeather } from '../../apiFns/getWeather'
import { SearchContext } from '../../provider/SearchProvider';
import { getDate } from '../../timeFns/getDate';



const SearchBtn = ({ placeHolderTxt, userLocation, setTargetLocation, searchInput, isGettingUserLocation }) => {
    const { _isLoadingScreenOn, _isWeatherDataReceived, _currentDate, _weather } = useContext(SearchContext)
    const [, setWeather] = _weather;
    const [currentDate, setCurrentDate] = _currentDate;
    const [isLoadingScreenOn, setIsLoadingScreenOn] = _isLoadingScreenOn;
    const [isWeatherDataReceived, setIsWeatherDataReceived] = _isWeatherDataReceived;
    const isOnUserLocationSearch = placeHolderTxt === "Using your location. Press the 'search' icon to get results";
    const isButtonDisabled = ((isOnUserLocationSearch && !navigator?.geolocation) || isGettingUserLocation) ? true : false;


    useEffect(() => {
        console.log('userLocation: ', userLocation)
    })

    const getTimeOfLocation = timeZone => {
        const options = {
            timeZone: timeZone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
        let formatter = new Intl.DateTimeFormat([], options);

        return formatter.format(new Date())
    }

    const _getWeather = locationName => {
        getWeather(userLocation)
            .then(response => {
                const { weather, didError } = response;
                if (didError) {
                    console.error('An error has occurred in getting weather of target location.')
                    alert('An error has occurred in getting weather of target location.')
                    return;
                };
                if (!weather) {
                    alert('Something went wrong, please refresh the page and try again.')
                    return;
                }

                const { daily, timezone, current } = weather;
                const { temp, feels_like } = daily[0];
                daily.shift();
                daily.pop();
                setWeather({ daily, current: { ...current, moreInfo: { temp, feels_like } } })
                setCurrentDate(getDate())
                setTargetLocation(targetLocation => {
                    return {
                        ...targetLocation,
                        name: locationName ?? searchInput,
                        time: getTimeOfLocation(timezone),
                    }
                });
                setIsLoadingScreenOn(false);
                setIsWeatherDataReceived(true);
            })
        debugger
    };




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
            console.log('userLocation: ', userLocation)
            if (!userLocation) {
                alert("Couldn't get your location. Either your browser doesn't support geolocation or you have disabled location access from your computer.")
                return;
            }
            setIsWeatherDataReceived(false);
            setIsLoadingScreenOn(true)
            getUserCityName(userLocation).then(location => {
                const { country, state, name } = location;
                if (state) {
                    var _location = `${name}, ${state}, ${country}`
                } else if (state && country) {
                    _location = `${state}, ${country}`;
                } else if (country) {
                    _location = country
                } else {
                    _location = "Unable to get your location. "
                }
                _getWeather(_location);
            })
            debugger
        }
    } else if (placeHolderTxt === 'Search by address, city name, or zip code') {
        handleSearchBtnClick = () => {
            setIsWeatherDataReceived(false);
            _getWeather()
        };
    }



    return (
        <button
            disabled={isButtonDisabled}
            onClick={handleSearchBtnClick}
        >
            {isGettingUserLocation ? 'Getting location...' : 'Search'}
        </button>
    )
}

export default SearchBtn