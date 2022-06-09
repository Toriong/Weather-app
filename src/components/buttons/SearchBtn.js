import React, { useContext, useEffect } from 'react'
import { getUserCityName } from '../../apiFns/getUserCityName';
import { getWeather } from '../../apiFns/getWeather'
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import { getTimeOfLocation } from '../../timeFns/getTimeOfLocation';
import { BiSearch } from "react-icons/bi";
import { updateUrl } from '../../historyFns/updateUrl';
import { useState } from 'react';

const SearchBtn = ({ isOnSmallerScreen }) => {
    const { _isLoadingScreenOn, _isWeatherDataReceived, _currentDate, _weather, _targetLocation, _longAndLat, _isGettingUserLocation, _units, _longAndLatOfDisplayedWeather } = useContext(WeatherInfoContext)
    const { _searchInput, _placeHolderTxt, _doesGeoLocationWork, _wasSearchBtnClicked, _selectedLocation } = useContext(SearchContext);
    const [selectedLocation,] = _selectedLocation;
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
    const [alertTimerGetWeather, setAlertTimerGetWeather] = useState(null);
    const [alertTimerGetCityName, setAlertTimerGetCityName] = useState(null)
    const [willClearTimerGetWeather, setWillClearTimerGetWeather] = useState(false);
    const [willClearTimerGetCityName, setWillClearTimerGetCityName] = useState(false);
    const isOnUserLocationSearch = placeHolderTxt === "Using your location. Press the 'search' icon to get results";
    const isButtonDisabled = ((isOnUserLocationSearch && !navigator?.geolocation) || isGettingUserLocation || ((searchInput.length <= 2) && !isOnUserLocationSearch) || (isOnUserLocationSearch && !doesGoeLocationWork)) ? true : false;
    const isOnImperial = units.temp === '°F';




    const _getWeather = (location, isUnableToRetrieveLocal) => {
        !alertTimerGetWeather && setAlertTimerGetWeather(setTimeout(() => {
            alert('Sorry, but it looks like it is taking longer than usually to get the weather data that you requested. Refresh the page and try again.')
            setAlertTimerGetWeather(null);
        }, 10000));
        getWeather(longAndLat, isOnImperial)
            .then(response => {
                setWillClearTimerGetWeather(true);
                if (!response) {
                    alert('Sorry, but something went wrong, refresh the page and try again.')
                    return;
                }
                const { weather, didError, errorMsg } = response;
                if (didError) {
                    console.error('An error has occurred in getting weather of target location. Error message: ', errorMsg);
                    alert('An error has occurred in getting weather of target location.')
                    return;
                };
                if (!weather) {
                    alert('Something went wrong, please refresh the page and try again.')
                    return;
                };

                const { country, state, name } = location ?? selectedLocation;

                if (state && (name !== state)) {
                    var _location = `${name}, ${state}, ${country}`
                } else if (state && country) {
                    _location = `${state}, ${country}`;
                } else if (name && country) {
                    _location = `${name}, ${country}`
                }

                const { daily, timezone, current, timezone_offset } = weather;
                const { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dew_point } = daily[0];
                daily.shift();
                daily.pop();
                setWeather({ daily, current: { ...current, averageForTheDay: { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dewPoint: dew_point } }, timezone })
                setCurrentDate(getTimeOfLocation(timezone, true))
                // if the locationName is null and the searchInput is absent then get the name of the city from the weather obj
                setTargetLocation(targetLocation => {
                    return {
                        ...targetLocation,
                        name: isUnableToRetrieveLocal ? "Couldn't get the name of your location" : (_location ?? searchInput),
                        time: getTimeOfLocation(timezone),
                        timeZoneOffset: timezone_offset
                    }
                });
                setIsLoadingScreenOn(false);
                setIsWeatherDataReceived(true);
                setLongAndLatOfDisplayedWeather(longAndLat);
                isUnableToRetrieveLocal ? updateUrl(null, true) : updateUrl(location ?? selectedLocation);
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
            !alertTimerGetCityName && setAlertTimerGetCityName(setTimeout(() => {
                // will get the weather data, but will tell the user that the program is unable to get the name of their current location 
                _getWeather(null, true);
            }, 10000));

            getUserCityName(longAndLat)
                .then(location => {
                    setWillClearTimerGetCityName(true);
                    _getWeather(location);
                })
        }
    } else if (placeHolderTxt === 'Search by city name') {
        handleSearchBtnClick = () => {
            // this will prevent the code that will get the weather data when the url changes without the user pressing the search button 
            setWasSearchBtnClicked(true)
            setIsWeatherDataReceived(false);
            setIsLoadingScreenOn(true);
            _getWeather();
        };
    }


    useEffect(() => {
        if (willClearTimerGetWeather) {
            clearTimeout(alertTimerGetWeather);
            setWillClearTimerGetWeather(false);
            console.log('timeout was cleared, get weather data')
        }

        if (willClearTimerGetCityName) {
            clearTimeout(alertTimerGetCityName);
            setWillClearTimerGetCityName(false);
            console.log('timeout was cleared for getting city name')
        }

        wasSearchBtnClicked && setWasSearchBtnClicked(false);

    }, [willClearTimerGetWeather, wasSearchBtnClicked, willClearTimerGetCityName])









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