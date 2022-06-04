import React from 'react'
import { useContext } from 'react';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import '../../css/comp-css/weather-section/weatherTempTable.css'

const WeatherTempTable = ({ data }) => {
    const { _units } = useContext(WeatherInfoContext);
    const { temp: tempUnits } = _units?.[0] ?? {};
    const { feelsLike, temp } = data ?? {};
    const { day: feelsLikeDay, eve: feelsLikeEve, morn: feelsLikeMorn, night: feelsLikeNight } = feelsLike ?? {};
    const { day, eve, morn, night } = temp ?? {};

    // GOAL: display weather data for the selected day
    return (
        <table className='weatherTempTable'>
            <tr>
                <th></th>
                <th>Morning</th>
                <th>Afternoon</th>
                <th>Evening</th>
                <th>Night</th>
            </tr>
            <tr className='secondRow'>
                <td>Temp</td>
                <td>{Math.round(morn)} {tempUnits}</td>
                <td>{Math.round(day)} {tempUnits}</td>
                <td>{Math.round(eve)} {tempUnits}</td>
                <td>{Math.round(night)} {tempUnits}</td>
            </tr>
            <tr className='thirdRow'>
                <td>Feels like</td>
                <td>{Math.round(feelsLikeMorn)} {tempUnits}</td>
                <td>{Math.round(feelsLikeDay)} {tempUnits}</td>
                <td>{Math.round(feelsLikeEve)} {tempUnits}</td>
                <td>{Math.round(feelsLikeNight)} {tempUnits}</td>
            </tr>
        </table>
    )
}

export default WeatherTempTable