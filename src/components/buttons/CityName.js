import React from 'react'
import { useContext } from 'react';
import { SearchContext } from '../../provider/SearchProvider';
import { ModalContext } from '../../provider/ModalProvider';

const CityName = ({ isOnSmallerScreen }) => {
    const { _searchInput, _placeHolderTxt } = useContext(SearchContext);
    const { _isSearchAndUnitTypesModalOn, _isSearchTypesModalOn } = useContext(ModalContext);
    const [, setIsSearchAndUnitTypesModalOn] = _isSearchAndUnitTypesModalOn;
    const [, setPlaceHolderTxt] = _placeHolderTxt;
    const [, setSearchInput] = _searchInput
    const [, setIsSearchTypesModalOn] = _isSearchTypesModalOn;

    const handleGeneralSearchBtnClick = () => {
        setPlaceHolderTxt('Search by city name');
        isOnSmallerScreen ? setIsSearchAndUnitTypesModalOn(false) : setIsSearchTypesModalOn(false);
        setSearchInput("");
    };

    return <button onClick={handleGeneralSearchBtnClick}>By city name</button>
}

export default CityName