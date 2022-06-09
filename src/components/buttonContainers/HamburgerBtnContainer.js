import React, { useContext } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import HamburgerBtns from '../modals/HamburgerBtns';
import { ModalContext } from '../../provider/ModalProvider'



const HamburgerBtnContainer = () => {
    const { _isSearchAndUnitTypesModalOn } = useContext(ModalContext);
    const [isSearchAndUnitTypesModalOn, setIsSearchAndUnitTypesModalOn] = _isSearchAndUnitTypesModalOn;

    const handleHamburgerBtnClick = () => { setIsSearchAndUnitTypesModalOn(isSearchAndUnitTypesModalOn => !isSearchAndUnitTypesModalOn); };

    return (
        <div className='hamburgerBtnContainer'>
            <button name='hamburgerBtn' onClick={handleHamburgerBtnClick}>
                <GiHamburgerMenu />
            </button>
            <div>
                {isSearchAndUnitTypesModalOn &&
                    <HamburgerBtns />
                }
            </div>
        </div>
    )
}

export default HamburgerBtnContainer