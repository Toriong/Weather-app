import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import Footer from './components/Footer';
import SelectedWeatherDay from './components/modals/SelectedWeatherDay';
import SearchBar from './components/search/SearchBar';
import WeatherSection from './components/weatherUI/WeatherSection';
import { ModalContext } from './provider/ModalProvider';

// GOAL: present modal onto the screen when the user presses one of the weather card's 

const WeatherApp = () => {
  const { _isSelectedWeatherModalOn } = useContext(ModalContext);
  const [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn] = _isSelectedWeatherModalOn;
  const [targetLocation, setTargetLocation] = useState({});
  const [weather, setWeather] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);

  const closeModal = () => { setIsSelectedWeatherModalOn(false) };





  // const _weatherOfDays = [weather, setWeather];


  // GOAL: when the user presses the search button, get the location of the target location


  return (
    <div className="weather-app-main">
      <SearchBar setWeather={setWeather} setCurrentDate={setCurrentDate} />
      <WeatherSection targetLocation={targetLocation} weather={weather} currentDate={currentDate} />
      {isSelectedWeatherModalOn &&
        <>
          <div className='blocker' onClick={closeModal} />
          <SelectedWeatherDay />
        </>

      }
      <Footer />
    </div>
  );
}

export default WeatherApp;
