import React, { useEffect, useState } from 'react'
import { getGeoCode } from '../../apiFns/getGeoCode';
import '../../css/comp-css/search/searchInputSection.css'
import SearchBtnsContainer from './SearchBtnsContainer';



const SearchInput = () => {
    const [placeholderTxt, setPlaceholderTxt] = useState("Search by city");
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = useState(false);
    const _isSearchTypesModalOn = [isSearchTypesModalOn, setIsSearchTypesModalOn];
    const _placeholderTxt = [placeholderTxt, setPlaceholderTxt];

    if (placeholderTxt === 'Search by address') {
        var handleOnChange = event => {
            const data = getGeoCode(event.target.value);
            const { addresses, didError } = data;
            if (didError) {
                alert('Something went wrong, please try again later.')
                return;
            }
            console.log('addresses: ', addresses)
        }
    }

    return (
        <section className='searchInputContainer'>
            <div>
                <input type="text" placeholder={placeholderTxt} onChange={event => { handleOnChange(event) }} />
                <SearchBtnsContainer _placeHolderTxt={_placeholderTxt} _isSearchTypesModalOn={_isSearchTypesModalOn} />
            </div>
        </section>
    )
}

export default SearchInput