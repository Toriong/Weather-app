import React from 'react'
import { useContext } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'
import { SearchContext } from '../../../provider/SearchProvider';
import { WeatherInfoContext } from '../../../provider/WeatherInfoProvider';

const SearchResult = ({ searchResult, index }) => {
    const { lon, lat, country: countryCode, state, name, countryName } = searchResult
    const { _longAndLat } = useContext(WeatherInfoContext);
    const { _isSearchResultsOn, _searchInput, _selectedLocation } = useContext(SearchContext);
    const [, setSelectedLocation] = _selectedLocation;
    const [, setIsSearchResultsOn] = _isSearchResultsOn;
    const [, setLongAndLat] = _longAndLat
    const [, setSearchInput] = _searchInput;
    const _searchResult = (state && (name !== state)) ? `${name}, ${state}, ${countryName}` : `${name}, ${countryName}`;

    const handleSearchResultClick = () => {
        setSearchInput(_searchResult);
        const _selectedLocation = (state && (name !== state)) ? { name, state, country: countryName, countryCode } : { name, country: countryName, countryCode };
        setSelectedLocation(_selectedLocation);
        setLongAndLat({ longitude: lon, latitude: lat });
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