import React, { useState, createContext } from 'react'


export const ModalContext = createContext();



export const ModalProvider = props => {
    const [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn] = useState(false);
    const [isSearchAndUnitTypesModalOn, setIsSearchAndUnitTypesModalOn] = useState(false);
    const [isUnitsSelectionModalOn, setIsUnitsSelectionModalOn] = useState(false);
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = useState(false);

    return (
        <ModalContext.Provider
            value={{
                _isSelectedWeatherModalOn: [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn],
                _isSearchAndUnitTypesModalOn: [isSearchAndUnitTypesModalOn, setIsSearchAndUnitTypesModalOn],
                _isUnitsSelectionModalOn: [isUnitsSelectionModalOn, setIsUnitsSelectionModalOn],
                _isSearchTypesModalOn: [isSearchTypesModalOn, setIsSearchTypesModalOn]
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}