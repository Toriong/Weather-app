import React, { useEffect, useState } from 'react'
import SearchBar from './components/search/SearchBar';
import WeatherSection from './components/weatherUI/WeatherSection';

const WeatherApp = () => {
  const [targetLocation, setTargetLocation] = useState({});
  const [weatherOfDays, setWeatherOfDays] = useState([]);

  // const _weatherOfDays = [weatherOfDays, setWeatherOfDays];


  // GOAL: when the user presses the search button, get the location of the target location


  return (
    <div className="weather-app-main">
      <SearchBar setWeatherOfDays={setWeatherOfDays} setTargetLocation={setTargetLocation} />
      <WeatherSection targetLocation={targetLocation} weatherOfDays={weatherOfDays} />
    </div>
  );
}

export default WeatherApp;
