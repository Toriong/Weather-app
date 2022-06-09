import React from 'react';
import MyLocation from '../buttons/MyLocation';
import CityName from '../buttons/CityName';
import '../../css/comp-css/modals/modalBtns.css'



// NOTES:




const SearchTypes = () => (
    <div className='modalBtns'>
        <CityName />
        <MyLocation />
    </div>
)

export default SearchTypes