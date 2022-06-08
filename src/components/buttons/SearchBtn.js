import React, { useContext, useEffect } from 'react'
import { getUserCityName } from '../../apiFns/getUserCityName';
import { getWeather } from '../../apiFns/getWeather'
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import { getDate } from '../../timeFns/getDate';
import { getTimeOfLocation } from '../../timeFns/getTimeOfLocation';
import { BiSearch } from "react-icons/bi";
import history from '../../history/history';
import { updateUrl } from '../../historyFns/updateUrl';
import { useState } from 'react';

// WHAT IS HAPPENING: 
// the history state is storing the previous pathname
// when getting the url params, the params is the current city that is being displayed onto the dom 

const SearchBtn = ({ isOnSmallerScreen }) => {
    const { _isLoadingScreenOn, _isWeatherDataReceived, _currentDate, _weather, _targetLocation, _longAndLat, _isGettingUserLocation, _units, _longAndLatOfDisplayedWeather } = useContext(WeatherInfoContext)
    const { _searchInput, _placeHolderTxt, _doesGeoLocationWork, _wasSearchBtnClicked } = useContext(SearchContext);
    const [wasSearchBtnClicked, setWasSearchBtnClicked] = _wasSearchBtnClicked;
    const [doesGoeLocationWork,] = _doesGeoLocationWork;
    const [units] = _units;
    const [placeHolderTxt] = _placeHolderTxt;
    const [longAndLatOfDisplayedWeather, setLongAndLatOfDisplayedWeather] = _longAndLatOfDisplayedWeather;
    const [isGettingUserLocation] = _isGettingUserLocation;
    const [searchInput,] = _searchInput;
    const [longAndLat,] = _longAndLat;
    const [, setWeather] = _weather;
    const [targetLocation, setTargetLocation] = _targetLocation;
    const [currentDate, setCurrentDate] = _currentDate;
    const [isLoadingScreenOn, setIsLoadingScreenOn] = _isLoadingScreenOn;
    const [isWeatherDataReceived, setIsWeatherDataReceived] = _isWeatherDataReceived;
    const isOnUserLocationSearch = placeHolderTxt === "Using your location. Press the 'search' icon to get results";
    const isButtonDisabled = ((isOnUserLocationSearch && !navigator?.geolocation) || isGettingUserLocation || ((searchInput.length <= 2) && !isOnUserLocationSearch) || (isOnUserLocationSearch && !doesGoeLocationWork)) ? true : false;
    const isOnImperial = units.temp === '°F';




    const _getWeather = locationName => {
        const gettingDataTimer = setTimeout(() => { alert('Sorry, but it looks like it is taking longer than usually to get the weather data that you requested. Try refreshing the page and try again.') }, 10000)
        getWeather(longAndLat, isOnImperial)
            .then(response => {
                if (!response) {
                    alert('Sorry, but something went wrong, refresh the page and try again.')
                    return;
                }
                const { weather, didError, errorMsg } = response;
                clearTimeout(gettingDataTimer);
                if (didError) {
                    console.error('An error has occurred in getting weather of target location. Error message: ', errorMsg);
                    alert('An error has occurred in getting weather of target location.')
                    return;
                };
                if (!weather) {
                    alert('Something went wrong, please refresh the page and try again.')
                    return;
                }
                const { daily, timezone, current, timezone_offset } = weather;
                console.log('bacon and cheese: ', timezone)
                const { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dew_point } = daily[0];
                daily.shift();
                daily.pop();
                setWeather({ daily, current: { ...current, averageForTheDay: { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dewPoint: dew_point } }, timezone })
                setCurrentDate(getTimeOfLocation(timezone, true))
                setTargetLocation(targetLocation => {
                    return {
                        ...targetLocation,
                        name: locationName ?? searchInput,
                        time: getTimeOfLocation(timezone),
                        timeZoneOffset: timezone_offset
                    }
                });
                setIsLoadingScreenOn(false);
                setIsWeatherDataReceived(true);
                setLongAndLatOfDisplayedWeather(longAndLat);
                updateUrl(locationName ?? searchInput);
            }).finally(() => {
                setWasSearchBtnClicked(true);
            });
    };


    if (isOnUserLocationSearch) {
        var handleSearchBtnClick = () => {
            if (!longAndLat) {
                alert("Couldn't get your location. Either your browser doesn't support geolocation or you have disabled location access from your computer.")
                return;
            }
            setWasSearchBtnClicked(true)
            setIsWeatherDataReceived(false);
            setIsLoadingScreenOn(true);
            getUserCityName(longAndLat).then(location => {
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
                setLongAndLatOfDisplayedWeather(longAndLat);
            })
        }
    } else if (placeHolderTxt === 'Search by address, city name, or zip code') {
        handleSearchBtnClick = () => {
            setWasSearchBtnClicked(true)
            setIsWeatherDataReceived(false);
            setIsLoadingScreenOn(true);
            _getWeather();
        };
    };

    useEffect(() => {
        wasSearchBtnClicked && setWasSearchBtnClicked(false);
    }, [wasSearchBtnClicked])








    return (
        <button
            disabled={isButtonDisabled}
            onClick={handleSearchBtnClick}
        >
            {!isOnSmallerScreen ?
                (isGettingUserLocation ? 'Getting location...' : <BiSearch id='searchIconOnLaptop' />)
                :
                <BiSearch />
            }
        </button>
    )
}

export default SearchBtn