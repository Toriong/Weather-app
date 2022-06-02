import React, { useEffect, useState } from 'react'
import SearchBar from './components/search/SearchBar';
import WeatherSection from './components/weatherUI/WeatherSection';

const WeatherApp = () => {
  const [targetLocation, setTargetLocation] = useState({});
  const [weather, setWeather] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);





  // const _weatherOfDays = [weather, setWeather];


  // GOAL: when the user presses the search button, get the location of the target location


  return (
    <div className="weather-app-main">
      <SearchBar setWeather={setWeather} setTargetLocation={setTargetLocation} setCurrentDate={setCurrentDate} />
      <WeatherSection targetLocation={targetLocation} weather={weather} currentDate={currentDate} />
    </div>
  );
}

export default WeatherApp;
