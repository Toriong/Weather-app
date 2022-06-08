import React from 'react'
import SearchBtn from '../buttons/SearchBtn';
import { useContext } from 'react';
import { SearchContext } from '../../provider/SearchProvider';
import UnitTypes from '../buttonContainers/UnitTypes';
import SearchTypesContainer from '../buttonContainers/SearchTypesContainer'
import HamburgerBtnContainer from '../buttonContainers/HamburgerBtnContainer';
import '../../css/comp-css/search/searchBtnsContainer.css'

//GOAL: throw an alert if it takes over 20 seconds to get the address results 

const SearchBtnsContainer = () => {
    const { _isSearchTypesModalOn, _placeHolderTxt } = useContext(SearchContext);
    const [placeholderTxt, setPlaceHolderTxt] = _placeHolderTxt;
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = _isSearchTypesModalOn;

    const handleSearchTypeBtnClick = () => { setIsSearchTypesModalOn(isSearchTypesModalOn => !isSearchTypesModalOn) };



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
                <span>*Enter at least three characters.</span>
            </div>
            <div className='searchBtnsSubContainer'>
                <UnitTypes />
                <SearchTypesContainer
                    searchTypeTxt={searchTypeTxt}
                    handleSearchTypeBtnClick={handleSearchTypeBtnClick}
                    isSearchTypesModalOn={isSearchTypesModalOn}
                />
                <SearchBtn />
            </div>
            <div className='searchBtnsSubContainerOnSmallerScreen'>
                <HamburgerBtnContainer />
                <SearchBtn isOnSmallerScreen />
            </div>
        </div>
    )
}

export default SearchBtnsContainer