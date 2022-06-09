import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import UnitTypesModal from '../modals/UnitTypesModal'
import '../../css/comp-css/unitsSelectionContainer.css'
import { ModalContext } from '../../provider/ModalProvider';


const UnitTypes = () => {
    const { _units } = useContext(WeatherInfoContext);
    const { _isUnitsSelectionModalOn, _isSearchTypesModalOn } = useContext(ModalContext);
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = _isSearchTypesModalOn;
    const [isUnitsSelectionModalOn, setIsUnitsSelectionModalOn] = _isUnitsSelectionModalOn;
    const [units] = _units;
    const unitsType = (units.temp === '°F') ? 'Imperial (°F, mph)' : 'Metric (°C, m/s)';

    const toggleUnitsSelectionModal = () => {
        isSearchTypesModalOn && setIsSearchTypesModalOn(false);
        setIsUnitsSelectionModalOn(isUnitsSelectionModalOn => !isUnitsSelectionModalOn);
    };


    return (
        <div className='unitsSelectionContainer'>
            <button onClick={toggleUnitsSelectionModal}>
                <span>{unitsType}</span>
            </button>
            <div>
                {isUnitsSelectionModalOn && <UnitTypesModal />}
            </div>
        </div>
    )
}

export default UnitTypes