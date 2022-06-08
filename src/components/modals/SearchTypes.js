import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import '../../css/comp-css/modals/searchTypeModal.css'
import MyLocation from '../buttons/MyLocation';
import CityName from '../buttons/CityName';
import ZipCode from '../buttons/ZipCode';


// NOTES:




const SearchTypes = () => (
    <div className='modalBtns'>
        <CityName />
        <MyLocation />
    </div>
)

export default SearchTypes