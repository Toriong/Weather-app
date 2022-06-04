import React, { useState, createContext } from 'react'


export const ModalContext = createContext();



// rename this provider to WeatherProvider
export const ModalProvider = props => {
    const [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn] = useState(false);




    return (
        <ModalContext.Provider
            value={{
                _isSelectedWeatherModalOn: [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn]
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}