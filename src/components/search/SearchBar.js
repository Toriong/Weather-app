import React, { useState } from 'react'
import '../../css/comp-css/search/searchBar.css'
import SearchInputContainer from './SearchInputSection'

const SearchBar = () => {

    return (
        <div className='wrapper'>
            <div className='searchBar'>
                <div className='searchBarSubContainer'>
                    <section>
                        <h1>Gabe's 7 day forecast</h1>
                    </section>
                    <SearchInputContainer />
                </div>
            </div>
        </div>
    )
}

export default SearchBar