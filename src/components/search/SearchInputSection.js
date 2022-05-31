import React, { useEffect, useState } from 'react'
import { getGeoCode } from '../../apiFns/getGeoCode';
import '../../css/comp-css/search/searchInputSection.css'
import SearchResults from '../modals/searchResults/SearchResults';
import SearchBtnsContainer from './SearchBtnsContainer';



const SearchInput = () => {
    const [placeholderTxt, setPlaceholderTxt] = useState('Search by address, city name, or zip code');
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = useState(false);
    const [isSearchResultsOn, setIsSearchResultsOn] = useState(false);
    const [isLoadingResults, setIsLoadingResults] = useState(false);
    const [longAndLatOfUser, setLongAndLatOfUser] = useState(null);
    const _longAndLatOfUser = [longAndLatOfUser, setLongAndLatOfUser];
    const [searchResults, setSearchResults] = useState([])
    const _isSearchTypesModalOn = [isSearchTypesModalOn, setIsSearchTypesModalOn];
    const _placeholderTxt = [placeholderTxt, setPlaceholderTxt];

    if (placeholderTxt === 'Search by address, city name, or zip code') {
        var handleOnChange = event => {
            if (event.target.value.length >= 3) {
                setIsSearchResultsOn(true);
                getGeoCode(event.target.value).then(data => {
                    const { addresses, didError, errorMsg } = data;
                    if (didError) {
                        console.error('An error has occurred: ', errorMsg);
                        alert('An error has occurred, will refresh page.')
                        window.location.reload();
                        return;
                    };
                    console.log('addresses: ', addresses);
                    setSearchResults(addresses);
                    setIsLoadingResults(false);
                });
                setIsLoadingResults(true);
            } else {
                setIsSearchResultsOn(false)
            }
        };

    }

    return (
        <section className='searchInputContainer'>
            <div>
                <input type="text" placeholder={placeholderTxt} onChange={event => { handleOnChange(event) }} />
                <div className='searchResultsContainer'>
                    {isSearchResultsOn &&
                        <SearchResults
                            isLoadingResults={isLoadingResults}
                            searchResults={searchResults}
                        />
                    }
                </div>
                <SearchBtnsContainer
                    _placeHolderTxt={_placeholderTxt}
                    _isSearchTypesModalOn={_isSearchTypesModalOn}
                    _longAndLatOfUser={_longAndLatOfUser}
                />
            </div>
        </section>
    )
}

export default SearchInput