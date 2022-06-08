import React, { useContext } from 'react'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import SearchTypeAndUnits from '../modals/SearchTypeAndUnits';
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
                    <SearchTypeAndUnits />
                }
            </div>
        </div>
    )
}

export default HamburgerBtnContainer