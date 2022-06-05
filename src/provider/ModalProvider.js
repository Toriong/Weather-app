import React, { useState, createContext } from 'react'


export const ModalContext = createContext();



export const ModalProvider = props => {
    const [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn] = useState(false);
    const [isSearchAndUnitTypesModalOn, setIsSearchAndUnitTypesModalOn] = useState(false);

    return (
        <ModalContext.Provider
            value={{
                _isSelectedWeatherModalOn: [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn],
                _isSearchAndUnitTypesModalOn: [isSearchAndUnitTypesModalOn, setIsSearchAndUnitTypesModalOn]
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}