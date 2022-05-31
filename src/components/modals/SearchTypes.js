import React, { useEffect, useState } from 'react';
import '../../css/comp-css/modals/searchTypeModal.css'


// NOTES:




const SearchTypes = ({ setPlaceHolderTxt, setIsSearchTypesModalOn, setLongAndLatOfUser, setSearchInput }) => {




    const handleMyLocationClick = () => {
        if (navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { longitude, latitude } = position.coords;
                setLongAndLatOfUser({ longitude, latitude });
            });
        } else {
            alert("This browser doesn't support geolocation.")
        }
        setPlaceHolderTxt("Using your location. Press the 'search' icon to get results")
        setIsSearchTypesModalOn(false);
        setSearchInput("");
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