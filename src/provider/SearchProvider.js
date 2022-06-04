import React, { useState, createContext } from 'react'


export const SearchContext = createContext();



// rename this provider to WeatherProvider
export const SearchProvider = props => {
    const [isLoadingWeatherDataDone, setIsLoadingWeaetherDateDone] = useState(false)
    const [isWeatherDataReceived, setIsWeatherDataReceived] = useState(false);
    const [isLoadingScreenOn, setIsLoadingScreenOn] = useState(false);
    const [weather, setWeather] = useState(null);
    const [currentDate, setCurrentDate] = useState("");
    const [isCelsius, setIsCelsius] = useState(false);
    const [selectedWeatherDay, setSelectedWeatherDay] = useState({});





    return (
        <SearchContext.Provider
            value={{
                _isLoadingWeatherDataDone: [isLoadingWeatherDataDone, setIsLoadingWeaetherDateDone],
                _isWeatherDataReceived: [isWeatherDataReceived, setIsWeatherDataReceived],
                _isLoadingScreenOn: [isLoadingScreenOn, setIsLoadingScreenOn],
                _currentDate: [currentDate, setCurrentDate],
                _weather: [weather, setWeather],
                _isCelsius: [isCelsius, setIsCelsius],
                _selectedWeatherDay: [selectedWeatherDay, setSelectedWeatherDay]
            }}
        >
            {props.children}
        </SearchContext.Provider>
    )
}