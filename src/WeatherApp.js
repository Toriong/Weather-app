import React, { useEffect, useState, useRef } from 'react'
import { useLayoutEffect } from 'react';
import { useContext } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';
import { displayWeatherFromApi } from './apiFns/displayWeatherFromApi';
import { getGeoCode, getReverseGeoCode } from './apiFns/getGeoCode';
import Footer from './components/Footer';
import SelectedWeatherDay from './components/modals/SelectedWeatherDay';
import SearchBar from './components/search/SearchBar';
import WeatherSection from './components/weatherUI/WeatherSection';
import { ModalContext } from './provider/ModalProvider';
import { SearchContext } from './provider/SearchProvider';
import { WeatherInfoContext } from './provider/WeatherInfoProvider';
import history from './history/history';
import { GiConsoleController } from 'react-icons/gi';




// GOAL: present modal onto the screen when the user presses one of the weather card's 

const WeatherApp = () => {
  const { longitude, latitude } = useParams();
  const { _isLoadingScreenOn, _isWeatherDataReceived, _currentDate, _weather, _targetLocation, _units, _longAndLatOfDisplayedWeather, _longAndLat } = useContext(WeatherInfoContext)
  const { _wasSearchBtnClicked, _searchInput, _placeHolderTxt } = useContext(SearchContext);
  const { _isSelectedWeatherModalOn } = useContext(ModalContext);
  const [, setPlaceHolderTxt] = _placeHolderTxt;
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
  const firstRender = useRef({ didOccur: false });

  const closeModal = () => { setIsSelectedWeatherModalOn(false) };

  const resetWeatherUI = () => {
    setSearchInput("");
    setIsWeatherDataReceived(false);
    isSelectedWeatherModalOn && setIsSelectedWeatherModalOn(false);
  }

  const getWeatherData = () => {
    resetWeatherUI(true);
    getReverseGeoCode({ longitude, latitude }).then(data => {
      const { didError, errorMsg, _locations } = data ?? {}
      if ((didError && !_locations?.[0]) || !data) {
        console.error('An error has occurred. Error message: ', errorMsg)
        alert('An error has occurred. Refresh the page and try again.')
      } else if (!didError && _locations?.[0]) {
        console.log('will display weather data')
        const { name, country, state } = _locations?.[0];
        console.log('_locations: ', _locations)
        const locationName = (state && state !== name) ? `${name}, ${state}, ${country}` : `${name}, ${country}`;
        const vals = { longAndLat: { longitude: longitude, latitude: latitude }, isOnImperial, locationName };
        const fns = { setWeather, setTargetLocation, setCurrentDate, setIsLoadingScreenOn, setIsWeatherDataReceived, setLongAndLatOfDisplayedWeather, setSearchInput, setPlaceHolderTxt };
        displayWeatherFromApi(vals, fns);
      };
    })
  }


  useEffect(() => {
    if (!firstRender.current.didOccur) {
      firstRender.current.didOccur = true;
    } else if (!wasSearchBtnClicked) {
      console.log('pathname: ', history.location.pathname)
      if (history.location.pathname !== '/') {
        getWeatherData();
      } else {
        resetWeatherUI();
      }
    }
  }, [history.location.pathname])

  useLayoutEffect(() => {
    const { pathname } = history.location;
    (pathname !== '/') && getWeatherData();
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
