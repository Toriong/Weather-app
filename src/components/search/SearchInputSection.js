import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { getGeoCode } from '../../apiFns/getGeoCode';
import '../../css/comp-css/search/searchInputSection.css'
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import SearchResults from '../modals/searchResults/SearchResults';
import SearchBtnsContainer from './SearchBtnsContainer';


// GOAL: store the 7 day forecast into the state of weatherOfDays


const SearchInput = () => {
    const { _searchInput, _placeHolderTxt, _isSearchResultsOn } = useContext(SearchContext);
    const [placeholderTxt,] = _placeHolderTxt;
    const [isSearchResultsOn, setIsSearchResultsOn] = _isSearchResultsOn;
    const [isLoadingResults, setIsLoadingResults] = useState(false);
    const [searchInput, setSearchInput] = _searchInput;
    const [searchResults, setSearchResults] = useState([]);
    const [alertTimer, setAlertTimer] = useState(null);

    // GOAL: have the alert only appear once on the screen. 


    // GOAL: start the timer in the handleOnChange function 


    if (placeholderTxt === 'Search by address, city name, or zip code') {
        var handleOnChange = event => {
            setSearchInput(event.target.value);
            if (event.target.value.length >= 3) {
                setIsLoadingResults(true);
                setIsSearchResultsOn(true);
                !alertTimer && setAlertTimer(setTimeout(() => {
                    alert('It is taking longer than usually getting addresses. Try refreshing the page and try again.')
                    setAlertTimer(null);
                }, 15000));
                getGeoCode(event.target.value).then(data => {
                    clearTimeout(alertTimer);
                    if (!data) {
                        alert('An error has occurred in getting address search results, refresh the page and try again.');
                        return;
                    }
                    const { addresses, didError, errorMsg } = data ?? {}
                    if (didError) {
                        console.error('An error has occurred: ', errorMsg);
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
        var isUsingLocationOfUser = true;
    }

    useEffect(() => () => {
        alertTimer && clearTimeout(alertTimer)
    }, [])


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
                        />
                    }
                </div>
                <SearchBtnsContainer />
            </div>
        </section>
    )
}

export default SearchInput