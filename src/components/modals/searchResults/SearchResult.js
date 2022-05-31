import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const SearchResult = ({ label, longitude, latitude }) => {

    // GOAL: when the user clicks on a search result, do the following:
    // display the label in the input 
    // get the long and lat 
    return (
        <div className='searchResult'>
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