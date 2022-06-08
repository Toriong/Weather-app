import React from 'react'
import { useContext } from 'react'
import { getWeather } from '../../apiFns/getWeather';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider'
import { getDate } from '../../timeFns/getDate';
import { getTimeOfLocation } from '../../timeFns/getTimeOfLocation';
import UnitTypesBtns from '../buttons/UnitTypesBtns';

const UnitTypes = ({ setIsUnitsSelectionModalOn }) => {



    return (
        <div className='modalBtns unitsSelection'>
            <UnitTypesBtns setIsUnitsSelectionModalOn={setIsUnitsSelectionModalOn} />
        </div>
    )
}

export default UnitTypes