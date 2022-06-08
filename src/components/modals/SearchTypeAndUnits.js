import React from 'react'
import { useContext } from 'react'
import { getSearchTypeTxt } from '../../searchFns/getSearchTypeTxt';
import { SearchContext } from '../../provider/SearchProvider';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider'
import { useState } from 'react';
import MyLocation from '../buttons/MyLocation';
import GeneralSearch from '../buttons/CityName';
import UnitTypesBtns from '../buttons/UnitTypesBtns';
import ZipCode from '../buttons/ZipCode';

const SearchTypeAndUnits = () => {
    const { _units } = useContext(WeatherInfoContext);
    const { _placeHolderTxt } = useContext(SearchContext);
    const [wasSearchTypeClicked, setWasSearchTypeClicked] = useState(false);
    const [wasAnOptionClick, setWasAnOptionClicked] = useState(false);
    const [wasUnitsBtnClicked, setWasUnitsBtnClicked] = useState(false);
    const searchTypeTxt = getSearchTypeTxt(_placeHolderTxt[0]);
    const unitsType = (_units[0].temp === '°F') ? 'Imperial (°F, mph)' : 'Metric (°C, m/s)'

    const handleSearchTypeClick = () => {
        setWasSearchTypeClicked(true);
        setWasAnOptionClicked(true);
    };

    const handleUnitsBtnClick = () => {
        setWasUnitsBtnClicked(true);
        setWasAnOptionClicked(true);
    };

    const handleBackBtnClick = () => {
        wasUnitsBtnClicked && setWasUnitsBtnClicked(false);
        wasSearchTypeClicked && setWasSearchTypeClicked(false);
        setWasAnOptionClicked(false);
    };

    return (
        <div className='modalBtns searchTypeAndUnits'>
            {!wasAnOptionClick &&
                <>
                    <button onClick={handleSearchTypeClick}>Search type: {searchTypeTxt}</button>
                    <button onClick={handleUnitsBtnClick}>Units: {unitsType}</button>
                </>
            }
            {wasSearchTypeClicked &&
                <>
                    <GeneralSearch isOnSmallerScreen />
                    <MyLocation isOnSmallerScreen />
                    <button className='backBtn' onClick={handleBackBtnClick}>Back</button>
                </>
            }
            {wasUnitsBtnClicked &&
                <>
                    <UnitTypesBtns />
                    <button className='backBtn' onClick={handleBackBtnClick}>Back</button>
                </>
            }
        </div>
    )
}

export default SearchTypeAndUnits