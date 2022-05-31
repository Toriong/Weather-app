import React, { useEffect, useState } from 'react'
import { getGeoCode } from '../../apiFns/getGeoCode';
import '../../css/comp-css/search/searchInputSection.css'
import SearchBtnsContainer from './SearchBtnsContainer';



const SearchInput = () => {
    const [placeholderTxt, setPlaceholderTxt] = useState('Search by address, city name, or zip code');
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = useState(false);
    const _isSearchTypesModalOn = [isSearchTypesModalOn, setIsSearchTypesModalOn];
    const _placeholderTxt = [placeholderTxt, setPlaceholderTxt];

    if (placeholderTxt === 'Search by address, city name, or zip code') {
        var handleOnChange = event => {
            getGeoCode(event.target.value).then(data => {
                const { addresses, didError, errorMsg } = data;
                if (didError) {
                    console.error('An error has occurred: ', errorMsg);
                    alert('An error has occurred, will refresh page.')
                    window.location.reload();
                    return;
                };
                console.log('addresses: ', addresses)
            })
        }
    }

    return (
        <section className='searchInputContainer'>
            <div>
                <input type="text" placeholder={placeholderTxt} onChange={event => { (event.target.value.length >= 3) && handleOnChange(event) }} />
                <SearchBtnsContainer _placeHolderTxt={_placeholderTxt} _isSearchTypesModalOn={_isSearchTypesModalOn} />
            </div>
        </section>
    )
}

export default SearchInput