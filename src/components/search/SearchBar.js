import React, { useState } from 'react'
import '../../css/comp-css/search/searchBar.css'
import SearchInputSection from './SearchInputSection'

const SearchBar = ({ setWeatherOfDays, setTimeOfLocation }) => {

    return (
        <div className='wrapper'>
            <div className='searchBar'>
                <div className='searchBarSubContainer'>
                    <section>
                        <h1>Gabe's 7 day forecast</h1>
                    </section>
                    <SearchInputSection setWeatherOfDays={setWeatherOfDays} setTimeOfLocation={setTimeOfLocation} />
                </div>
            </div>
        </div>
    )
}

export default SearchBar