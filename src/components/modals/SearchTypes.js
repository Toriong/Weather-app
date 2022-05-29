import React, { useEffect, useState } from 'react';
import '../../css/comp-css/modals/searchTypeModal.css'


// NOTES:




const SearchTypes = ({ setPlaceHolderTxt, setIsSearchTypesModalOn, setLongAndLatOfUser }) => {




    const handleMyLocationClick = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { longitude, latitude } = position.coords;
            setLongAndLatOfUser({ longitude, latitude });
        });
        setPlaceHolderTxt("Using your location. Press the 'search' icon to get results")
        setIsSearchTypesModalOn(false);
    }




    return (
        <div className='searchTypesModal'>
            <button>By city</button>
            <button>By address</button>
            <button>By zip code</button>
            <button onClick={handleMyLocationClick}>My location</button>
        </div>
    )
}

export default SearchTypes