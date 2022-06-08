import React from 'react'
import { useContext } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'
import { SearchContext } from '../../../provider/SearchProvider';
import { WeatherInfoContext } from '../../../provider/WeatherInfoProvider';

const SearchResult = ({ searchResult, index }) => {
    const { long, lat, country, state, name } = searchResult
    const { _longAndLat } = useContext(WeatherInfoContext);
    const { _isSearchResultsOn, _searchInput } = useContext(SearchContext);
    const [, setIsSearchResultsOn] = _isSearchResultsOn;
    const [, setLongAndLat] = _longAndLat
    const [, setSearchInput] = _searchInput;
    const _searchResult = state ? `${name}, ${state}, ${country}` : `${name}, ${country}`;


    const handleSearchResultClick = () => {
        setSearchInput(_searchResult);
        setLongAndLat({ longitude: long, latitude: lat });
        setIsSearchResultsOn(false);
    }

    return (
        <div
            key={index}
            className='searchResult'
            onClick={handleSearchResultClick}
        >
            <div>
                <FaMapMarkerAlt />
            </div>
            <div>
                <span>{_searchResult}</span>
            </div>
        </div>
    )
}

export default SearchResult