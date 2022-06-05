import React, { useState, createContext } from 'react'


export const SearchContext = createContext();



export const SearchProvider = props => {
    const [searchInput, setSearchInput] = useState('');
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = useState(false);
    const [isSearchResultsOn, setIsSearchResultsOn] = useState(false);
    const [placeholderTxt, setPlaceholderTxt] = useState('Search by address, city name, or zip code');

    return (
        <SearchContext.Provider
            value={{
                _searchInput: [searchInput, setSearchInput],
                _isSearchTypesModalOn: [isSearchTypesModalOn, setIsSearchTypesModalOn],
                _placeHolderTxt: [placeholderTxt, setPlaceholderTxt],
                _isSearchResultsOn: [isSearchResultsOn, setIsSearchResultsOn]
            }}
        >
            {props.children}
        </SearchContext.Provider>
    )
}