import React, { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import SearchTypes from '../modals/SearchTypes';
import SearchBtn from '../buttons/SearchBtn';
import { useContext } from 'react';
import { SearchContext } from '../../provider/SearchProvider';
import '../../css/comp-css/search/searchBtnsContainer.css'
import UnitTypes from '../buttonContainers/UnitTypes';


const SearchBtnsContainer = () => {
    const { _isSearchTypesModalOn, _placeHolderTxt } = useContext(SearchContext);
    const [placeholderTxt, setPlaceHolderTxt] = _placeHolderTxt;
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = _isSearchTypesModalOn;

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
    } else if (placeholderTxt === 'Search by address, city name, or zip code') {
        searchTypeTxt = 'General search';
    }

    return (
        <div className='searchBtnsContainer'>
            <div>
                <span>*Search must contain three or more characters.</span>
            </div>
            <div className='searchBtnsSubContainer'>
                <UnitTypes />
                <div className='searchTypeContainer'>
                    <button onClick={handleSearchTypeBtnClick}>
                        <span>{searchTypeTxt}</span>
                    </button>
                    <div>
                        {isSearchTypesModalOn && <SearchTypes />}
                    </div>
                </div>
                <SearchBtn />
            </div>
        </div>
    )
}

export default SearchBtnsContainer