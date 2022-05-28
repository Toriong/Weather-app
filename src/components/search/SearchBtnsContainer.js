import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import '../../css/comp-css/search/searchBtnsContainer.css'
import SearchTypes from '../modals/SearchTypes';

const SearchBtnsContainer = ({ _placeHolderTxt, _isSearchTypesModalOn }) => {
    const [placeholderTxt, setPlaceHolderTxt] = _placeHolderTxt;
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = _isSearchTypesModalOn;
    // GOAL: when the modal appears son the screen for the search type, when the user chooses a search type, then change the placeholder text

    const handleSearchTypeBtnClick = () => { setIsSearchTypesModalOn(isSearchTypesModalOn => !isSearchTypesModalOn) }

    if (placeholderTxt === "Search by city") {
        var searchTypeTxt = 'By city';
    } else if (placeholderTxt === 'Search by zip code') {
        var searchTypeTxt = 'By zip code';
    } else if (placeholderTxt === 'Search by my location') {
        var searchTypeTxt = 'My location';
    } else if (placeholderTxt === 'Search by address') {
        var searchTypeTxt = 'By address';
    }

    return (
        <div className='searchBtnsContainer'>
            <div className='searchTypeContainer'>
                <button onClick={handleSearchTypeBtnClick}>
                    <span>{searchTypeTxt}</span>
                </button>
                <div>
                    {isSearchTypesModalOn && <SearchTypes />}
                </div>
            </div>
            <button>
                <BsSearch />
            </button>
        </div>
    )
}

export default SearchBtnsContainer