import React from 'react'
import { useContext } from 'react';
import { ModalContext } from '../../provider/ModalProvider';
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';

const MyLocation = ({ isOnSmallerScreen }) => {
    const { _searchInput, _placeHolderTxt, _doesGeoLocationWork } = useContext(SearchContext);
    const { _longAndLat, _isGettingUserLocation } = useContext(WeatherInfoContext);
    const { _isSearchAndUnitTypesModalOn, _isSearchTypesModalOn } = useContext(ModalContext);
    const [, setDoesGoeLocationWork] = _doesGeoLocationWork;
    const [, setIsSearchAndUnitTypesModalOn] = _isSearchAndUnitTypesModalOn;
    const [, setPlaceHolderTxt] = _placeHolderTxt;
    const [, setIsGettingUserLocation] = _isGettingUserLocation;
    const [, setSearchInput] = _searchInput
    const [, setLongAndLat] = _longAndLat;
    const [, setIsSearchTypesModalOn] = _isSearchTypesModalOn;

    const handleMyLocationClick = () => {
        if (navigator?.geolocation) {
            const geoLocalFailed = setTimeout(() => {
                setIsGettingUserLocation(false);
                setDoesGoeLocationWork(false);
                alert('Geo location has failed. Your browser may not support geolocation. Try refreshing the page or switch to general search and type in your location.')
            }, 15000);
            navigator.geolocation.getCurrentPosition(position => {
                clearTimeout(geoLocalFailed);
                const { longitude, latitude } = position.coords;
                console.log('position.coords: ', position.coords)
                setLongAndLat({ longitude, latitude });
                setIsGettingUserLocation(false);
            })
        } else {
            alert("This browser doesn't support geolocation.");
            return;
        }
        setPlaceHolderTxt("Using your location. Press the 'search' icon to get results");
        isOnSmallerScreen ? setIsSearchAndUnitTypesModalOn(false) : setIsSearchTypesModalOn(false);
        setSearchInput("");
        setIsGettingUserLocation(true);
    };
    return <button onClick={handleMyLocationClick}>My location</button>
}

export default MyLocation