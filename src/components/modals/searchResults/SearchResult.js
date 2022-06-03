import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const SearchResult = ({ label, longitude, latitude, fns }) => {
    const { setSearchInput, setLongAndLatOfUser, setIsSearchResultsOn } = fns;

    // GOAL: when the user clicks on a search result, do the following:
    // display the label in the input 
    // get the long and lat 

    const handleSearchResultClick = () => {
        setSearchInput(label);
        setLongAndLatOfUser({ longitude, latitude });
        setIsSearchResultsOn(false);
    }

    return (
        <div
            className='searchResult'
            onClick={handleSearchResultClick}
        >
            <div>
                <FaMapMarkerAlt />
            </div>
            <div>
                <span>{label}</span>
            </div>
        </div>
    )
}

export default SearchResult