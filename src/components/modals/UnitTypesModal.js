import React from 'react'
import UnitTypesBtns from '../buttons/UnitTypesBtns';

const UnitTypes = ({ setIsUnitsSelectionModalOn }) => (
    <div className='modalBtns unitsSelection'>
        <UnitTypesBtns setIsUnitsSelectionModalOn={setIsUnitsSelectionModalOn} />
    </div>
);

export default UnitTypes