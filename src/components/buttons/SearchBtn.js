import React, { useContext, useEffect } from 'react'
import { getUserCityName } from '../../apiFns/getUserCityName';
import { getWeather } from '../../apiFns/getWeather'
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import { getDate } from '../../timeFns/getDate';



const SearchBtn = ({ placeHolderTxt, userLocation, searchInput, isGettingUserLocation }) => {
    const { _isLoadingScreenOn, _isWeatherDataReceived, _currentDate, _weather, _targetLocation } = useContext(WeatherInfoContext)
    const [, setWeather] = _weather;
    const [targetLocation, setTargetLocation] = _targetLocation;
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
                console.log('hello there meng: ', daily[0])
                console.log('current yo: ', current)
                const { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dew_point } = daily[0];
                console.log('dew_point, mengggg: ', dew_point)
                console.log('rain, mengg: ', rain)
                daily.shift();
                daily.pop();
                setWeather({ daily, current: { ...current, averageForTheDay: { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dewPoint: dew_point } } })
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