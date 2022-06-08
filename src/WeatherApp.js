import React, { useEffect, useState, useRef } from 'react'
import { useLayoutEffect } from 'react';
import { useContext } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';
import { displayWeatherFromApi } from './apiFns/displayWeatherFromApi';
import { getGeoCode } from './apiFns/getGeoCode';
import Footer from './components/Footer';
import SelectedWeatherDay from './components/modals/SelectedWeatherDay';
import SearchBar from './components/search/SearchBar';
import WeatherSection from './components/weatherUI/WeatherSection';
import { ModalContext } from './provider/ModalProvider';
import { SearchContext } from './provider/SearchProvider';
import { WeatherInfoContext } from './provider/WeatherInfoProvider';
import history from './history/history';


const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => { ref.current = value })

  return ref.current
}

const useLocationChange = (action) => {
  const location = useLocation()
  const prevLocation = usePrevious(location)
  useEffect(() => {
    console.log('currentLocation: ', location)
    console.log('prev: ', prevLocation)
  }, [location])
}


// GOAL: present modal onto the screen when the user presses one of the weather card's 

const WeatherApp = () => {
  const { location } = useParams();
  const { _isLoadingScreenOn, _isWeatherDataReceived, _currentDate, _weather, _targetLocation, _units, _longAndLatOfDisplayedWeather } = useContext(WeatherInfoContext)
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




  // GOAL: when the url changes without the user pressing the search button, get the new weather results from the weather api 


  const getWeatherData = _pathname => {
    let pathname = _pathname;
    pathname = pathname.replace(/%20/g, ' ')
    pathname = pathname.replace(/\//g, ' ');
    const splitByComma = pathname.split(",");
    const cityName = splitByComma[0];
    const country = splitByComma[splitByComma.length - 1];
    const secondIdentifier = (splitByComma.length > 3) && splitByComma[1];
    // const searchQuery = (splitByComma.length > 1) ? `${cityName}, ${country}` : pathname;
    if (secondIdentifier) {
      var searchQuery = `${cityName}, ${secondIdentifier}, ${country}`;
    } else {
      searchQuery = (splitByComma.length > 1) ? `${cityName}, ${country}` : pathname
    }

    console.log('searchQuery: ', searchQuery)

    const getGeoCodeTimer = setTimeout(() => { alert('Sorry, but it looks like it is taking longer than usually to get the weather data that you requested. Try refreshing the page and try again.') }, 10000)
    getGeoCode(searchQuery.toLocaleLowerCase()).then(data => {
      console.log('data: ', data)
      clearTimeout(getGeoCodeTimer);
      if (!data) {
        alert('Something went wrong, refresh the page and try again.')
        return;
      }
      const { addresses, didError, errorMsg } = data;
      if (didError) {
        console.error('An error has occurred: ', errorMsg);
        alert('An error has occurred, page will now refresh.')
        window.location.reload();
        return;
      };
      if (addresses.length === 1) {
        // GOAL: get the label, long, and the lat
        console.log('hello there meng')
        const { longitude, latitude, label } = addresses[0];
        var vals = { isOnImperial, locationName: location, wasBrowserDirectBtnClicked: true, longAndLat: { longitude, latitude } };
      } else {
        // BRAIN DUMP:
        // get the target city that the user search on the first refresh of the page 
        console.log('addresses menggg: ', addresses)
        let targetLocation = addresses.find(({ label }) => label === searchQuery);
        targetLocation = !targetLocation ? addresses.find(({ label }) => label === location) : targetLocation;
        const highestConfidentAddressNum = addresses.map(({ confidence }) => confidence).sort()[0];
        targetLocation = !targetLocation ? addresses.find(({ confidence }) => confidence === highestConfidentAddressNum) : targetLocation;
        if (!targetLocation) {
          alert('An error has occurred, page will now refresh.');
          window.location.reload();
          return;
        }
        const { label, longitude, latitude } = targetLocation;
        vals = { isOnImperial, locationName: location, wasBrowserDirectBtnClicked: true, longAndLat: { longitude, latitude } }
      }
      const fns = { setWeather, setTargetLocation, setCurrentDate, setIsLoadingScreenOn, setIsWeatherDataReceived, setLongAndLatOfDisplayedWeather, setSearchInput, setPlaceHolderTxt }
      displayWeatherFromApi(vals, fns);
    })
  }

  useEffect(() => {
    if (!firstRender.current.didOccur) {
      firstRender.current.didOccur = true;
    } else if (!wasSearchBtnClicked) {
      const { pathname } = history.location
      if (pathname !== '/') {
        setIsWeatherDataReceived(false);
        setIsLoadingScreenOn(true);
        setSearchInput("");
        getWeatherData(pathname);
      } else {
        setSearchInput("");
        setIsWeatherDataReceived(false);
        setWeather(null);
      }
    }
  }, [history.location.pathname]);

  useLayoutEffect(() => {
    const { pathname } = history.location;
    setIsLoadingScreenOn(true);
    (pathname !== '/') && getWeatherData(pathname);
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
