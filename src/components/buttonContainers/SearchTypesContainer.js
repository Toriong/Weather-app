import React from 'react'
import SearchTypes from '../modals/SearchTypes'


const SearchTypesContainer = ({ searchTypeTxt, handleSearchTypeBtnClick, isSearchTypesModalOn }) => {
    return (
        <div className='searchTypeContainer'>
            <button onClick={handleSearchTypeBtnClick}>
                <span>{searchTypeTxt}</span>
            </button>
            <div>
                {isSearchTypesModalOn && <SearchTypes />}
            </div>
        </div>
    )
}

export default SearchTypesContainer;