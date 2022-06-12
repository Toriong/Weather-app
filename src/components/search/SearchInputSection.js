import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { getGeoCode, getGeoLocation } from '../../apiFns/getGeoCode';
import { SearchContext } from '../../provider/SearchProvider';
import SearchResults from '../modals/searchResults/SearchResults';
import SearchBtnsContainer from './SearchBtnsContainer';
import '../../css/comp-css/search/searchInputSection.css'


const SearchInput = () => {
    const { _searchInput, _placeHolderTxt, _isSearchResultsOn } = useContext(SearchContext);
    const [placeholderTxt,] = _placeHolderTxt;
    const [isSearchResultsOn, setIsSearchResultsOn] = _isSearchResultsOn;
    const [isLoadingResults, setIsLoadingResults] = useState(false);
    const [searchInput, setSearchInput] = _searchInput;
    const [searchResults, setSearchResults] = useState([]);
    const [alertTimer, setAlertTimer] = useState(null);
    const [willStopTimer, setWillStopTimer] = useState(false);

    if (placeholderTxt === 'Search by city name') {
        var handleOnChange = event => {
            setSearchInput(event.target.value);
            if (event.target.value.length >= 3) {
                setIsLoadingResults(true);
                setIsSearchResultsOn(true);
                !alertTimer && setAlertTimer(setTimeout(() => {
                    alert('It is taking longer than usually getting addresses. Try refreshing the page and try again.')
                    setAlertTimer(null);
                }, 15000));
                getGeoLocation(event.target.value).then(data => {
                    setWillStopTimer(true);
                    if (!data) {
                        alert('An error has occurred in getting address search results, refresh the page and try again.');
                        return;
                    }
                    const { _locations, didError, errorMsg } = data ?? {}
                    if (didError) {
                        console.error('An error has occurred: ', errorMsg);
                        return;
                    };
                    console.log('_locations: ', _locations)
                    setSearchResults(_locations);
                    setIsLoadingResults(false);
                });
            } else {
                setIsSearchResultsOn(false)
            }
        };
    } else if (placeholderTxt === "Using your location. Press the 'search' icon to get results") {
        var isUsingLocationOfUser = true;
    }

    useEffect(() => {
        return () => {
            if (alertTimer) {
                clearTimeout(alertTimer);
                setAlertTimer(null);
            }
        }
    }, []);

    useEffect(() => {
        if (willStopTimer) {
            clearTimeout(alertTimer);
            setAlertTimer(null);
            setWillStopTimer(false);
        }
    }, [willStopTimer])

    return (
        <section className='searchInputContainer'>
            <div>
                <input
                    disabled={isUsingLocationOfUser}
                    type='text'
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