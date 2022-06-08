import React from 'react'
import { useContext } from 'react';
import { ModalContext } from '../../provider/ModalProvider';
import { SearchContext } from '../../provider/SearchProvider';

const ZipCode = ({ isOnSmallerScreen }) => {
    const { _isSearchTypesModalOn, _searchInput, _placeHolderTxt } = useContext(SearchContext);
    const { _isSearchAndUnitTypesModalOn } = useContext(ModalContext);
    const [, setIsSearchAndUnitTypesModalOn] = _isSearchAndUnitTypesModalOn;
    const [, setPlaceHolderTxt] = _placeHolderTxt;
    const [, setSearchInput] = _searchInput
    const [, setIsSearchTypesModalOn] = _isSearchTypesModalOn;

    const handleZipCodeBtnClick = () => {
        setPlaceHolderTxt('Search by zip code');
        isOnSmallerScreen ? setIsSearchAndUnitTypesModalOn(false) : setIsSearchTypesModalOn(false);
        setSearchInput("");
    };

    return <button onClick={handleZipCodeBtnClick}>By zip code</button>
}

export default ZipCode