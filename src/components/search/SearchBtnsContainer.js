import React, { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import SearchTypes from '../modals/SearchTypes';
import '../../css/comp-css/search/searchBtnsContainer.css'
import SearchBtn from '../buttons/SearchBtn';

const SearchBtnsContainer = ({ _placeHolderTxt, _isSearchTypesModalOn }) => {
    const [placeholderTxt, setPlaceHolderTxt] = _placeHolderTxt;
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = _isSearchTypesModalOn;
    const [longAndLatOfUser, setLongAndLatOfUser] = useState(null);

    // GOAL: when the modal appears son the screen for the search type, when the user chooses a search type, then change the placeholder text

    const handleSearchTypeBtnClick = () => { setIsSearchTypesModalOn(isSearchTypesModalOn => !isSearchTypesModalOn) }


    // GOAL: when the user presses my location, display on the search input: 'Using your location. Press the search button, to see results'.
    // the following text appears in the search input: 'Using your location. Press the search button to see results'
    // the following text is passed into the setPlaceHolderTxt: 'Using your location. Press the search button to see results'
    // the user presses the my location button in the searchTypes button 

    if (placeholderTxt === "Search by city") {
        var searchTypeTxt = 'By city';
    } else if (placeholderTxt === 'Search by zip code') {
        searchTypeTxt = 'By zip code';
    } else if (placeholderTxt === "Using your location. Press the 'search' icon to get results") {
        searchTypeTxt = 'My location';
    } else if (placeholderTxt === 'Search by address') {
        searchTypeTxt = 'By address';
    }

    return (
        <div className='searchBtnsContainer'>
            <div className='searchTypeContainer'>
                <button onClick={handleSearchTypeBtnClick}>
                    <span>{searchTypeTxt}</span>
                </button>
                <div>
                    {isSearchTypesModalOn && <SearchTypes setPlaceHolderTxt={setPlaceHolderTxt} setIsSearchTypesModalOn={setIsSearchTypesModalOn} setLongAndLatOfUser={setLongAndLatOfUser} />}
                </div>
            </div>
            <SearchBtn placeHolderTxt={placeholderTxt} userLocation={longAndLatOfUser} />
        </div>
    )
}

export default SearchBtnsContainer