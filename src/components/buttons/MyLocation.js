import React from 'react'
import { useContext } from 'react';
import { ModalContext } from '../../provider/ModalProvider';
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';

const MyLocation = ({ isOnSmallerScreen }) => {
    const { _isSearchTypesModalOn, _searchInput, _placeHolderTxt } = useContext(SearchContext);
    const { _longAndLat, _isGettingUserLocation } = useContext(WeatherInfoContext);
    const { _isSearchAndUnitTypesModalOn } = useContext(ModalContext);
    const [, setIsSearchAndUnitTypesModalOn] = _isSearchAndUnitTypesModalOn;
    const [, setPlaceHolderTxt] = _placeHolderTxt;
    const [, setIsGettingUserLocation] = _isGettingUserLocation;
    const [, setSearchInput] = _searchInput
    const [, setLongAndLat] = _longAndLat;
    const [, setIsSearchTypesModalOn] = _isSearchTypesModalOn;

    const handleMyLocationClick = () => {
        if (navigator?.geolocation) {
            console.log('hey there meng')
            navigator.geolocation.getCurrentPosition(position => {
                const { longitude, latitude } = position.coords;
                console.log('position.coords: ', position.coords)
                setLongAndLat({ longitude, latitude });
                setIsGettingUserLocation(false);
            });
        } else {
            alert("This browser doesn't support geolocation.")
        }
        setPlaceHolderTxt("Using your location. Press the 'search' icon to get results");
        isOnSmallerScreen ? setIsSearchAndUnitTypesModalOn(false) : setIsSearchTypesModalOn(false);
        setSearchInput("");
        setIsGettingUserLocation(true);
    };
    return <button onClick={handleMyLocationClick}>My location</button>
}

export default MyLocation