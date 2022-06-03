import React, { useEffect, useState } from 'react'
import '../../css/comp-css/search/searchBar.css'
import SearchInputSection from './SearchInputSection'

const SearchBar = ({ setWeather, setTargetLocation, setCurrentDate }) => {

    return (
        <div className='wrapper'>
            <div className='searchBar'>
                <div className='searchBarSubContainer'>
                    <section>
                        <h1>Gabe's 7 day forecast</h1>
                    </section>
                    <SearchInputSection setWeather={setWeather} setTargetLocation={setTargetLocation} setCurrentDate={setCurrentDate} />
                </div>
            </div>
        </div>
    )
}

export default SearchBar