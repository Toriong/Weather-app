
import React from 'react'
import { useContext } from 'react'
import history from '../../history/history'
import { updateUrl } from '../../historyFns/updateUrl'
import { ModalContext } from '../../provider/ModalProvider'
import { WeatherInfoContext } from '../../provider/WeatherInfoProvider'


const ResetSearch = ({ resetBtnCss }) => {
    const { _weather } = useContext(WeatherInfoContext);
    const { _isLoadingScreenOn } = useContext(WeatherInfoContext);
    const { _isSearchAndUnitTypesModalOn } = useContext(ModalContext);
    const [, setIsSearchAndUnitTypesModalOn] = _isSearchAndUnitTypesModalOn;
    const [isLoadingScreenOn,] = _isLoadingScreenOn;
    const [weather, setWeather] = _weather;
    const isBtnDisabled = ((weather === null) || (history.location.pathname === '/') || isLoadingScreenOn) && true;

    const handleOnClick = () => {
        updateUrl(null, true);
        setWeather(null);
        // when the reset button is in the hamburger modal in the search bar
        console.log('resetBtnCss: ', resetBtnCss)
        !resetBtnCss && setIsSearchAndUnitTypesModalOn(false)
    }

    return <button className={resetBtnCss ?? ""} disabled={isBtnDisabled} onClick={handleOnClick}>{resetBtnCss ? 'Reset search' : 'Reset'}</button>
}

export default ResetSearch