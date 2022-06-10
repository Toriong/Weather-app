import React from 'react'
import { useContext } from 'react';
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider';
import '../../css/comp-css/weather-section/weatherTempTable.css'

const WeatherTempTable = ({ data, isPresentDay }) => {
    const { _units } = useContext(WeatherInfoContext);
    const { temp: tempUnits } = _units?.[0] ?? {};
    const { feelsLike, temp } = data ?? {};
    const { day: feelsLikeDay, eve: feelsLikeEve, morn: feelsLikeMorn, night: feelsLikeNight } = feelsLike ?? {};
    const { day, eve, morn, night } = temp ?? {};

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
                <td>{Math.ceil(morn)} {tempUnits}</td>
                <td>{Math.ceil(day)} {tempUnits}</td>
                <td>{Math.ceil(eve)} {tempUnits}</td>
                <td>{Math.ceil(night)} {tempUnits}</td>
            </tr>
            <tr className='thirdRow'>
                <td>{isPresentDay ? 'Feels like' : 'Will feel like'}</td>
                <td>{Math.ceil(feelsLikeMorn)} {tempUnits}</td>
                <td>{Math.ceil(feelsLikeDay)} {tempUnits}</td>
                <td>{Math.ceil(feelsLikeEve)} {tempUnits}</td>
                <td>{Math.ceil(feelsLikeNight)} {tempUnits}</td>
            </tr>
        </table>
    )
}

export default WeatherTempTable