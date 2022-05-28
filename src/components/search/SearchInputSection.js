import React, { useState } from 'react'
import '../../css/comp-css/search/searchInputSection.css'
import SearchBtnsContainer from './SearchBtnsContainer';



const SearchInput = () => {
    const [placeholderTxt, setPlaceholderTxt] = useState("Search by city");
    const _placeholderTxt = [placeholderTxt, setPlaceholderTxt]

    return (
        <section className='searchInputContainer'>
            <div>
                <input type="text" placeholder={placeholderTxt} />
                <SearchBtnsContainer _placeHolderTxt={_placeholderTxt} />
            </div>
        </section>
    )
}

export default SearchInput