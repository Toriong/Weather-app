import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import '../../css/comp-css/modals/searchTypeModal.css'
import MyLocation from '../buttons/MyLocation';
import GeneralSearch from '../buttons/CityName';


// NOTES:




const SearchTypes = () => (
    <div className='modalBtns'>
        <GeneralSearch />
        <MyLocation />
    </div>
)

export default SearchTypes