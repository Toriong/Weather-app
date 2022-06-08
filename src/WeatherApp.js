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
  const [longAndLat] = _longAndLat;
  const [units,] = _units;
  const isOnImperial = units.temp === '°F';
  const [wasSearchBtnClicked,] = _wasSearchBtnClicked;
  const [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn] = _isSelectedWeatherModalOn;
  const firstRender = useRef({ didOccur: false });

  useEffect(() => {
    console.log('longAndLat: ', longAndLat)
  })




  const closeModal = () => { setIsSelectedWeatherModalOn(false) };




  // GOAL: when the url changes without the user pressing the search button, get the new weather results from the weather api 


  // const getWeatherData = _pathname => {
  //   let pathname = _pathname;
  //   pathname = pathname.replace(/%20/g, ' ')
  //   pathname = pathname.replace(/\//g, ' ');
  //   const splitByComma = pathname.split(",");
  //   console.log('spitByComma: ', splitByComma)
  //   const cityName = splitByComma[0];
  //   console.log('cityName: ', cityName)
  //   const country = splitByComma[splitByComma.length - 1];
  //   const secondIdentifier = (splitByComma.length > 3) && splitByComma[1];
  //   if (secondIdentifier) {
  //     var searchQuery = `${cityName}, ${secondIdentifier}, ${country}`;
  //   } else {
  //     searchQuery = (splitByComma.length > 1) ? `${cityName}, ${country}` : pathname
  //   }
  //   const getGeoCodeTimer = setTimeout(() => { alert('Sorry, an error has occurred. Refresh the page and try again.'); }, 15000)

  //   getGeoCode(searchQuery.toLocaleLowerCase()).then(data => {
  //     console.log('data: ', data)
  //     clearTimeout(getGeoCodeTimer);
  //     if (!data) {
  //       alert('Something went wrong, refresh the page and try again.')
  //       return;
  //     }
  //     const { addresses, didError, errorMsg } = data;
  //     if (didError) {
  //       console.error('An error has occurred: ', errorMsg);
  //       alert('An error has occurred, page will now refresh.')
  //       window.location.reload();
  //       return;
  //     };
  //     if (addresses.length === 1) {
  //       const { longitude, latitude, label } = addresses[0];
  //       var vals = { isOnImperial, locationName: location, wasBrowserDirectBtnClicked: true, longAndLat: { longitude, latitude } };
  //     } else {
  //       let targetLocation = addresses.find(({ label }) => label === searchQuery);
  //       targetLocation = !targetLocation ? addresses.find(({ label }) => label === location) : targetLocation;
  //       const highestConfidentAddressNum = addresses.map(({ confidence }) => confidence).sort()[0];
  //       targetLocation = !targetLocation ? addresses.find(({ confidence }) => confidence === highestConfidentAddressNum) : targetLocation;
  //       if (!targetLocation) {
  //         alert('An error has occurred, page will now refresh.');
  //         window.location.reload();
  //         return;
  //       }
  //       const { label, longitude, latitude } = targetLocation;
  //       vals = { isOnImperial, locationName: location, wasBrowserDirectBtnClicked: true, longAndLat: { longitude, latitude } }
  //     }
  //     const fns = { setWeather, setTargetLocation, setCurrentDate, setIsLoadingScreenOn, setIsWeatherDataReceived, setLongAndLatOfDisplayedWeather, setSearchInput, setPlaceHolderTxt }
  //     displayWeatherFromApi(vals, fns);
  //   })
  // }



  // useEffect(() => {
  //   if (!firstRender.current.didOccur) {
  //     firstRender.current.didOccur = true;
  //   } else if (!wasSearchBtnClicked) {
  //     const { pathname } = history.location
  //     if (pathname !== '/') {
  //       setIsWeatherDataReceived(false);
  //       setIsLoadingScreenOn(true);
  //       setSearchInput("");
  //       getWeatherData(pathname);
  //     } else {
  //       setSearchInput("");
  //       setIsWeatherDataReceived(false);
  //       setWeather(null);
  //     }
  //   }
  // }, [history.location.pathname]);

  useLayoutEffect(() => {
    const { pathname } = history.location;
    (pathname !== '/') && setIsLoadingScreenOn(true);
    (pathname !== '/') && getReverseGeoCode({ longitude, latitude }).then(data => {
      const { didError, errorMsg, _locations } = data ?? {}
      if ((didError && !_locations?.[0]) || !data) {
        console.error('An error has occurred. Error message: ', errorMsg)
        alert('An error has occurred. Refresh the page and try again.')
      } else if (!didError && _locations?.[0]) {
        console.log('will display weather data')
        const { name, country, state } = _locations?.[0];
        const locationName = (state && state !== name) ? `${name}, ${state}, ${country}` : `${name}, ${country}`;
        const vals = { longAndLat: { longitude: longitude, latitude: latitude }, isOnImperial, locationName };
        const fns = { setWeather, setTargetLocation, setCurrentDate, setIsLoadingScreenOn, setIsWeatherDataReceived, setLongAndLatOfDisplayedWeather, setSearchInput, setPlaceHolderTxt };
        displayWeatherFromApi(vals, fns);
      };
    }).finally(() => {
      setIsLoadingScreenOn(false);
    })
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
