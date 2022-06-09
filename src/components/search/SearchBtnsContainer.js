import React from 'react'
import SearchBtn from '../buttons/SearchBtn';
import { useContext } from 'react';
import { SearchContext } from '../../provider/SearchProvider';
import UnitTypes from '../buttonContainers/UnitTypes';
import SearchTypesContainer from '../buttonContainers/SearchTypesContainer'
import HamburgerBtnContainer from '../buttonContainers/HamburgerBtnContainer';
import '../../css/comp-css/search/searchBtnsContainer.css'
import { ModalContext } from '../../provider/ModalProvider';


const SearchBtnsContainer = () => {
    const { _placeHolderTxt } = useContext(SearchContext);
    const { _isUnitsSelectionModalOn, _isSearchTypesModalOn } = useContext(ModalContext);
    const [isUnitsSelectionModalOn, setIsUnitsSelectionModalOn] = _isUnitsSelectionModalOn;
    const [placeholderTxt,] = _placeHolderTxt;
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = _isSearchTypesModalOn;

    const handleSearchTypeBtnClick = () => {
        // when this button is clicked close the units modal
        isUnitsSelectionModalOn && setIsUnitsSelectionModalOn(false);
        setIsSearchTypesModalOn(isSearchTypesModalOn => !isSearchTypesModalOn)
    };



    if (placeholderTxt === "Search by city name") {
        var searchTypeTxt = 'By city';
    } else if (placeholderTxt === 'Search by zip code') {
        searchTypeTxt = 'By zip code';
    } else if (placeholderTxt === "Using your location. Press the 'search' icon to get results") {
        searchTypeTxt = 'My location';
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