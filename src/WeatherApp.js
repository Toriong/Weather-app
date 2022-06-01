import React, { useEffect, useState } from 'react'
import SearchBar from './components/search/SearchBar';
import WeatherSection from './components/weatherUI/WeatherSection';

const WeatherApp = () => {
  const [timeOfLocation, setTimeOfLocation] = useState(null)
  const [weatherOfDays, setWeatherOfDays] = useState([]);
  // const _weatherOfDays = [weatherOfDays, setWeatherOfDays];

  useEffect(() => {
    console.log('weatherDays: ', weatherOfDays)
  })


  return (
    <div className="weather-app-main">
      <SearchBar setWeatherOfDays={setWeatherOfDays} setTimeOfLocation={setTimeOfLocation} />
      <WeatherSection timeOfLocation={timeOfLocation} weatherOfDays={weatherOfDays} />
    </div>
  );
}

export default WeatherApp;
