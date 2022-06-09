import React, { useState, createContext } from 'react'


export const WeatherInfoContext = createContext();



// rename this provider to WeatherProvider
export const WeatherInfoProvider = props => {
    const [isLoadingWeatherDataDone, setIsLoadingWeaetherDateDone] = useState(false)
    const [isWeatherDataReceived, setIsWeatherDataReceived] = useState(false);
    const [isLoadingScreenOn, setIsLoadingScreenOn] = useState(false);
    const [weather, setWeather] = useState(null);
    const [currentDate, setCurrentDate] = useState("");
    const wasImperialUnitsChosen = localStorage.getItem('wasImperialUnitsChosen') && JSON.parse(localStorage.getItem('wasImperialUnitsChosen'));
    const unitsDefaultVal = {
        temp: wasImperialUnitsChosen ? '°F' : '°C',
        speed: wasImperialUnitsChosen ? 'mph' : 'm/s'
    };
    const [units, setUnits] = useState(unitsDefaultVal);
    const [selectedWeatherDay, setSelectedWeatherDay] = useState({});
    const [targetLocation, setTargetLocation] = useState({});
    const [longAndLat, setLongAndLat] = useState(null);
    const [longAndLatOfDisplayedWeather, setLongAndLatOfDisplayedWeather] = useState({});
    const [isGettingUserLocation, setIsGettingUserLocation] = useState(false);





    return (
        <WeatherInfoContext.Provider
            value={{
                _isLoadingWeatherDataDone: [isLoadingWeatherDataDone, setIsLoadingWeaetherDateDone],
                _isWeatherDataReceived: [isWeatherDataReceived, setIsWeatherDataReceived],
                _isLoadingScreenOn: [isLoadingScreenOn, setIsLoadingScreenOn],
                _currentDate: [currentDate, setCurrentDate],
                _weather: [weather, setWeather],
                _selectedWeatherDay: [selectedWeatherDay, setSelectedWeatherDay],
                _targetLocation: [targetLocation, setTargetLocation],
                _units: [units, setUnits],
                _longAndLat: [longAndLat, setLongAndLat],
                _isGettingUserLocation: [isGettingUserLocation, setIsGettingUserLocation],
                _longAndLatOfDisplayedWeather: [longAndLatOfDisplayedWeather, setLongAndLatOfDisplayedWeather]
            }}
        >
            {props.children}
        </WeatherInfoContext.Provider>
    )
}