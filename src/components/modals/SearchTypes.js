import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import '../../css/comp-css/modals/searchTypeModal.css'
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';


// NOTES:




const SearchTypes = () => {
    const { _isSearchTypesModalOn, _searchInput, _placeHolderTxt } = useContext(SearchContext);
    const { _longAndLatOfUser, _isGettingUserLocation } = useContext(WeatherInfoContext);
    const [, setPlaceHolderTxt] = _placeHolderTxt;
    const [, setIsGettingUserLocation] = _isGettingUserLocation;
    const [, setSearchInput] = _searchInput
    const [, setLongAndLatOfUser] = _longAndLatOfUser;
    const [, setIsSearchTypesModalOn] = _isSearchTypesModalOn;


    const handleMyLocationClick = () => {
        if (navigator?.geolocation) {
            console.log('hey there meng')
            navigator.geolocation.getCurrentPosition(position => {
                const { longitude, latitude } = position.coords;
                console.log('position.coords: ', position.coords)
                setLongAndLatOfUser({ longitude, latitude });
                setIsGettingUserLocation(false);
            });
        } else {
            alert("This browser doesn't support geolocation.")
        }
        setPlaceHolderTxt("Using your location. Press the 'search' icon to get results");
        setIsSearchTypesModalOn(false);
        setSearchInput("");
        setIsGettingUserLocation(true);
    };

    // GOAL: when the user presses the 'by address' button, do the following:
    // change the placeholder text to: 'Search by address'

    const handleGeneralSearchBtnClick = () => {
        setPlaceHolderTxt('Search by address, city name, or zip code');
        setIsSearchTypesModalOn(false);
        setSearchInput("");
    };




    return (
        <div className='searchTypesModal'>
            <button onClick={handleGeneralSearchBtnClick}>General search</button>
            <button onClick={handleMyLocationClick}>My location</button>
        </div>
    )
}

export default SearchTypes