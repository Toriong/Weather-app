import React, { useEffect, useState } from 'react'
import { getGeoCode } from '../../apiFns/getGeoCode';
import '../../css/comp-css/search/searchInputSection.css'
import SearchResults from '../modals/searchResults/SearchResults';
import SearchBtnsContainer from './SearchBtnsContainer';


// GOAL: store the 7 day forecast into the state of weatherOfDays


const SearchInput = ({ setWeather, setTargetLocation, setCurrentDate }) => {
    const [placeholderTxt, setPlaceholderTxt] = useState('Search by address, city name, or zip code');
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = useState(false);
    const [isSearchResultsOn, setIsSearchResultsOn] = useState(false);
    const [isLoadingResults, setIsLoadingResults] = useState(false);
    const [longAndLatOfUser, setLongAndLatOfUser] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const _searchInput = [searchInput, setSearchInput];
    const _longAndLatOfUser = [longAndLatOfUser, setLongAndLatOfUser];
    const _isSearchTypesModalOn = [isSearchTypesModalOn, setIsSearchTypesModalOn];
    const _placeholderTxt = [placeholderTxt, setPlaceholderTxt];
    let isUsingLocationOfUser = false




    if (placeholderTxt === 'Search by address, city name, or zip code') {
        var handleOnChange = event => {
            setSearchInput(event.target.value);
            if (event.target.value.length >= 3) {
                setIsLoadingResults(true);
                setIsSearchResultsOn(true);
                getGeoCode(event.target.value).then(data => {
                    const { addresses, didError, errorMsg } = data ?? {}
                    if (didError) {
                        console.error('An error has occurred: ', errorMsg);
                        alert('An error has occurred. Refresh the page and try again.')
                        return;
                    };
                    setSearchResults(addresses);
                    setIsLoadingResults(false);
                });
            } else {
                setIsSearchResultsOn(false)
            }
        };
    } else if (placeholderTxt === "Using your location. Press the 'search' icon to get results") {
        isUsingLocationOfUser = true;
    }

    return (
        <section className='searchInputContainer'>
            <div>
                <input
                    disabled={isUsingLocationOfUser}
                    type="text"
                    placeholder={placeholderTxt}
                    onChange={event => { handleOnChange(event) }}
                    value={searchInput}
                />
                <div className='searchResultsContainer'>
                    {isSearchResultsOn &&
                        <SearchResults
                            isLoadingResults={isLoadingResults}
                            searchResults={searchResults}
                            setSearchInput={setSearchInput}
                            setIsSearchResultsOn={setIsSearchResultsOn}
                            _longAndLatOfUser={_longAndLatOfUser}
                        />
                    }
                </div>
                <SearchBtnsContainer
                    _placeHolderTxt={_placeholderTxt}
                    _isSearchTypesModalOn={_isSearchTypesModalOn}
                    _longAndLatOfUser={_longAndLatOfUser}
                    setTargetLocation={setTargetLocation}
                    setWeather={setWeather}
                    _searchInput={_searchInput}
                    setCurrentDate={setCurrentDate}
                />
            </div>
        </section>
    )
}

export default SearchInput