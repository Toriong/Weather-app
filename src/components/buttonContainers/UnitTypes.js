import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import UnitTypesModal from '../modals/UnitTypesModal'
import '../../css/comp-css/unitsSelectionContainer.css'


const UnitTypes = () => {
    const { _units } = useContext(WeatherInfoContext);
    const [isUnitsSelectionModalOn, setIsUnitsSelectionModalOn] = useState(false);
    const [units] = _units;
    const unitsType = (units.temp === '°F') ? 'Imperial (°F, mph)' : 'Metric (°C, m/s)';

    const toggleUnitsSelectionModal = () => { setIsUnitsSelectionModalOn(isUnitsSelectionModalOn => !isUnitsSelectionModalOn); };

    // GOAL: get the search type that is stored in the local storage on first render in this comp

    // GOAL: when the user clicks on a unit type, save it into the local storage 

    return (
        <div className='unitsSelectionContainer'>
            <button onClick={toggleUnitsSelectionModal}>
                <span>{unitsType}</span>
            </button>
            <div>
                {isUnitsSelectionModalOn && <UnitTypesModal setIsUnitsSelectionModalOn={setIsUnitsSelectionModalOn} />}
            </div>
        </div>
    )
}

export default UnitTypes