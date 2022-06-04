import React, { useState, createContext } from 'react'


export const WeatherInfoContext = createContext();



// rename this provider to WeatherProvider
export const WeatherInfoProvider = props => {
    const [isLoadingWeatherDataDone, setIsLoadingWeaetherDateDone] = useState(false)
    const [isWeatherDataReceived, setIsWeatherDataReceived] = useState(false);
    const [isLoadingScreenOn, setIsLoadingScreenOn] = useState(false);
    const [weather, setWeather] = useState(null);
    const [currentDate, setCurrentDate] = useState("");
    const [isCelsius, setIsCelsius] = useState(false);
    const [tempUnits, setTempUnits] = useState('°F');
    const unitsDefaultVal = {
        temp: '°F',
        speed: 'mph'
    }
    const [units, setUnits] = useState(unitsDefaultVal)
    const [selectedWeatherDay, setSelectedWeatherDay] = useState({});
    const [targetLocation, setTargetLocation] = useState({});





    return (
        <WeatherInfoContext.Provider
            value={{
                _isLoadingWeatherDataDone: [isLoadingWeatherDataDone, setIsLoadingWeaetherDateDone],
                _isWeatherDataReceived: [isWeatherDataReceived, setIsWeatherDataReceived],
                _isLoadingScreenOn: [isLoadingScreenOn, setIsLoadingScreenOn],
                _currentDate: [currentDate, setCurrentDate],
                _weather: [weather, setWeather],
                _isCelsius: [isCelsius, setIsCelsius],
                _selectedWeatherDay: [selectedWeatherDay, setSelectedWeatherDay],
                _targetLocation: [targetLocation, setTargetLocation],
                _tempUnits: [tempUnits, setTempUnits],
                _units: [units, setUnits]
            }}
        >
            {props.children}
        </WeatherInfoContext.Provider>
    )
}