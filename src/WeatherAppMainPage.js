import React, { useEffect, useState, useRef } from 'react'
import { useLayoutEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { displayWeatherFromApi } from './apiFns/displayWeatherFromApi';
import { getGeoLocation } from './apiFns/getGeoCode';
import Footer from './components/Footer';
import SelectedWeatherDay from './components/modals/SelectedWeatherDay';
import SearchBar from './components/search/SearchBar';
import WeatherSection from './components/weatherUI/WeatherSection';
import { ModalContext } from './provider/ModalProvider';
import { SearchContext } from './provider/SearchProvider';
import { WeatherInfoContext } from './provider/WeatherInfoProvider';
import history from './history/history';
import { updateUrl } from './historyFns/updateUrl';


const WeatherApp = () => {
  const { city, state, country } = useParams();
  const { _isLoadingScreenOn, _isWeatherDataReceived, _currentDate, _weather, _targetLocation, _units, _longAndLatOfDisplayedWeather, _longAndLat } = useContext(WeatherInfoContext)
  const { _wasSearchBtnClicked, _searchInput, _placeHolderTxt, _selectedLocation } = useContext(SearchContext);
  const { _isSelectedWeatherModalOn } = useContext(ModalContext);
  const [, setSelectedLocation] = _selectedLocation;
  const [, setPlaceHolderTxt] = _placeHolderTxt;
  const [weather, setLongAndLat] = _longAndLat;
  const [, setWeather] = _weather;
  const [, setSearchInput] = _searchInput;
  const [, setTargetLocation] = _targetLocation;
  const [, setLongAndLatOfDisplayedWeather] = _longAndLatOfDisplayedWeather
  const [, setIsLoadingScreenOn] = _isLoadingScreenOn;
  const [, setIsWeatherDataReceived] = _isWeatherDataReceived;
  const [, setCurrentDate] = _currentDate;
  const [units,] = _units;
  const isOnImperial = units.temp === '°F';
  const [wasSearchBtnClicked,] = _wasSearchBtnClicked;
  const [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn] = _isSelectedWeatherModalOn;
  const [timerGetWeather, setTimerGetWeather] = useState(null);
  const firstRender = useRef({ didOccur: false });

  const closeModal = () => { setIsSelectedWeatherModalOn(false) };

  const _displayWeatherResults = (longitude, latitude, city, country, state, clearTimerGetWeather) => {
    const vals = { longAndLat: { longitude: longitude, latitude: latitude }, isOnImperial, location: { name: city, state: state, country: country } };
    const fns = { setWeather, setTargetLocation, setCurrentDate, setIsLoadingScreenOn, setIsWeatherDataReceived, setLongAndLatOfDisplayedWeather, setSearchInput, setPlaceHolderTxt, clearTimerGetWeather: clearTimerGetWeather };
    setSelectedLocation({ name: city, state: state, country: country });
    setLongAndLat({ longitude: longitude, latitude: latitude });
    setLongAndLatOfDisplayedWeather({ longitude: longitude, latitude: latitude });
    displayWeatherFromApi(vals, fns);
  }

  const resetWeatherUI = isLoadingScreenOn => {
    timerGetWeather && clearTimeout(timerGetWeather);
    setSearchInput("");
    setIsWeatherDataReceived(false);
    isLoadingScreenOn ? setIsLoadingScreenOn(true) : setIsLoadingScreenOn(false);
    isSelectedWeatherModalOn && setIsSelectedWeatherModalOn(false);
  }

  const respondToError = () => {
    updateUrl(null, true);
    alert('An error has occurred, page will now refresh.');
    window.location.reload();
  }

  const handleGeoLocationResponse = (data, timerGetWeather, isUsingStateLocation) => {
    clearTimeout(timerGetWeather);
    const { didError, errorMsg, _locations } = data ?? {}

    if ((didError && !_locations?.[0]) || !data) {
      console.error('An error has occurred. Error message: ', errorMsg)
      alert('An error has occurred. Refresh the page and try again.')
    } else if (!didError && _locations?.length > 1) {
      console.log('_location: ', _locations)
      const targetLocation = _locations.find(({ name: _city, country: _country, state: _state }) => {
        if (state) {
          return ((_city === city) && (_country === country) && (state === _state));
        };

        return ((_city === city) && (_country === country));
      });
      // for the first failure, 'location' was using city, state, and country, then send 'city, country' to the api to get the locations again  
      if (isUsingStateLocation && !targetLocation) {
        getGeoLocation(`${city}, ${country}`).then(data => {
          handleGeoLocationResponse(data, timerGetWeather, isUsingStateLocation);
        })
      } else if (!targetLocation) {
        respondToError();
        return;
      }
      const { name: targetCity, country: targetCountry, state: targetState, lon: longitude, lat: latitude } = targetLocation ?? {};
      const timerGetWeather = setTimeout(() => {
        alert('It is taking longer than usually to get weather data. You can refresh the page and try again.')
      }, 10000)
      setTimerGetWeather(timerGetWeather)
      const clearTimerGetWeather = () => clearTimeout(timerGetWeather);
      targetLocation && _displayWeatherResults(longitude, latitude, targetCity, targetCountry, targetState, clearTimerGetWeather);
    } else if (!didError && (_locations?.length === 1)) {
      const timerGetWeather = setTimeout(() => {
        alert('It is taking longer than usually to get weather data. You can refresh the page and try again.')
      }, 10000)
      setTimerGetWeather(timerGetWeather)
      const clearTimerGetWeather = () => clearTimeout(timerGetWeather);
      const { name: targetCity, country: targetCountry, state: targetState, lon: longitude, lat: latitude } = _locations?.[0];
      _displayWeatherResults(longitude, latitude, targetCity, targetCountry, targetState, clearTimerGetWeather);
    } else if (_locations?.length <= 0) {
      respondToError();
    }
  }

  const getWeatherData = isLoadingScreenOn => {
    resetWeatherUI(isLoadingScreenOn);
    const isUsingStateLocation = state && (state !== city)
    if (isUsingStateLocation) {
      var location = `${city}, ${state}, ${country}`;
    } else {
      location = `${city}, ${country}`
    }
    const timerGetWeather = setTimeout(() => {
      alert('An error has occurred in getting weather data. Refresh the page and try again.')
    }, 10000)
    getGeoLocation(location).then(data => {
      handleGeoLocationResponse(data, timerGetWeather, isUsingStateLocation);
    });
  }







  useEffect(() => {
    if (!firstRender.current.didOccur) {
      firstRender.current.didOccur = true;
    } else if (!wasSearchBtnClicked) {
      console.log('pathname: ', history.location.pathname)
      if (history.location.pathname !== '/') {
        timerGetWeather && clearTimeout(timerGetWeather);
        getWeatherData();
      } else {
        resetWeatherUI();
      }
    }
  }, [history.location.pathname])

  useLayoutEffect(() => {
    const { pathname } = history.location;
    (pathname !== '/') && getWeatherData(true);
  }, []);











  return (
    <div className="weather-app-main">
      <SearchBar />
      <WeatherSection />
      {isSelectedWeatherModalOn &&
        <>
          <div className='blocker' onClick={closeModal} />
          <SelectedWeatherDay closeModal={closeModal} />
        </>

      }
      <Footer />
    </div>
  );
}

export default WeatherApp;
