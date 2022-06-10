
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
        // if there is no css className, then the button is in the modal that appears in the searchBar. When btn is pressed, then close the modal
        !resetBtnCss && setIsSearchAndUnitTypesModalOn(false);
    }

    return <button className={resetBtnCss ?? ""} disabled={isBtnDisabled} onClick={handleOnClick}>{resetBtnCss ? 'Reset search' : 'Reset'}</button>
}

export default ResetSearch