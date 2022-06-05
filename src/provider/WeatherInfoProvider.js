import React, { useState, createContext } from 'react'


export const WeatherInfoContext = createContext();



// rename this provider to WeatherProvider
export const WeatherInfoProvider = props => {
    const [isLoadingWeatherDataDone, setIsLoadingWeaetherDateDone] = useState(false)
    const [isWeatherDataReceived, setIsWeatherDataReceived] = useState(false);
    const [isLoadingScreenOn, setIsLoadingScreenOn] = useState(false);
    const [weather, setWeather] = useState(null);
    const [currentDate, setCurrentDate] = useState("");
    const unitsDefaultVal = {
        temp: '°F',
        speed: 'mph'
    }
    const [units, setUnits] = useState(unitsDefaultVal)
    const [selectedWeatherDay, setSelectedWeatherDay] = useState({});
    const [targetLocation, setTargetLocation] = useState({});
    const [longAndLatOfUser, setLongAndLatOfUser] = useState(null);
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
                _longAndLatOfUser: [longAndLatOfUser, setLongAndLatOfUser],
                _isGettingUserLocation: [isGettingUserLocation, setIsGettingUserLocation],
            }}
        >
            {props.children}
        </WeatherInfoContext.Provider>
    )
}