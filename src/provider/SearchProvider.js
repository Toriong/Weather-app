import React, { useState, createContext } from 'react'


export const SearchContext = createContext();



export const SearchProvider = props => {
    const [searchInput, setSearchInput] = useState('');
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = useState(false);
    const [isSearchResultsOn, setIsSearchResultsOn] = useState(false);
    const [placeholderTxt, setPlaceholderTxt] = useState('Search by city name');
    const [doesGoeLocationWork, setDoesGoeLocationWork] = useState(true);
    const [wasSearchBtnClicked, setWasSearchBtnClicked] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({});

    return (
        <SearchContext.Provider
            value={{
                _searchInput: [searchInput, setSearchInput],
                _isSearchTypesModalOn: [isSearchTypesModalOn, setIsSearchTypesModalOn],
                _placeHolderTxt: [placeholderTxt, setPlaceholderTxt],
                _isSearchResultsOn: [isSearchResultsOn, setIsSearchResultsOn],
                _doesGeoLocationWork: [doesGoeLocationWork, setDoesGoeLocationWork],
                _wasSearchBtnClicked: [wasSearchBtnClicked, setWasSearchBtnClicked],
                _selectedLocation: [selectedLocation, setSelectedLocation]
            }}
        >
            {props.children}
        </SearchContext.Provider>
    )
}