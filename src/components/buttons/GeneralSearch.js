import React from 'react'
import { useContext } from 'react';
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import { ModalContext } from '../../provider/ModalProvider';

const GeneralSearch = ({ isOnSmallerScreen }) => {
    const { _isSearchTypesModalOn, _searchInput, _placeHolderTxt } = useContext(SearchContext);
    const { _isSearchAndUnitTypesModalOn } = useContext(ModalContext);
    const [, setIsSearchAndUnitTypesModalOn] = _isSearchAndUnitTypesModalOn;
    const [, setPlaceHolderTxt] = _placeHolderTxt;
    const [, setSearchInput] = _searchInput
    const [, setIsSearchTypesModalOn] = _isSearchTypesModalOn;

    const handleGeneralSearchBtnClick = () => {
        setPlaceHolderTxt('Search by address, city name, or zip code');
        isOnSmallerScreen ? setIsSearchAndUnitTypesModalOn(false) : setIsSearchTypesModalOn(false);
        setSearchInput("");
    };

    return <button onClick={handleGeneralSearchBtnClick}>General search</button>
}

export default GeneralSearch