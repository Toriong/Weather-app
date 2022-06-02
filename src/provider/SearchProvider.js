import React, { useState, createContext } from 'react'


export const SearchContext = createContext();




export const SearchProvider = props => {
    const [isLoadingWeatherDataDone, setIsLoadingWeaetherDateDone] = useState(false)
    const [isWeatherDataReceived, setIsWeatherDataReceived] = useState(false);
    const [isLoadingScreenOn, setIsLoadingScreenOn] = useState(false);
    const [currentDate, setCurrentDate] = useState("");




    return (
        <SearchContext.Provider
            value={{
                _isLoadingWeatherDataDone: [isLoadingWeatherDataDone, setIsLoadingWeaetherDateDone],
                _isWeatherDataReceived: [isWeatherDataReceived, setIsWeatherDataReceived],
                _isLoadingScreenOn: [isLoadingScreenOn, setIsLoadingScreenOn],
                _currentDate: [currentDate, setCurrentDate]
            }}
        >
            {props.children}
        </SearchContext.Provider>
    )
}