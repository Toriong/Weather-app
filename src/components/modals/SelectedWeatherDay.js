import React from 'react'
import { useContext } from 'react';
import '../../css/comp-css/modals/selectedWeatherDay.css';
import { SearchContext } from '../../provider/SearchProvider';

// GOAL: present the following data on this modal:
// 

const SelectedWeatherDay = () => {
    const { _selectedWeatherDay } = useContext(SearchContext);
    const [selectedWeatherDay] = _selectedWeatherDay;

    return (
        <div className='selectedWeatherDay'>

        </div>
    )
}

export default SelectedWeatherDay;