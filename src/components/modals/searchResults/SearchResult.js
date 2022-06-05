import React from 'react'
import { useContext } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'
import { SearchContext } from '../../../provider/SearchProvider';
import { WeatherInfoContext } from '../../../provider/WeatherInfoProvider';

const SearchResult = ({ label, longitude, latitude }) => {
    const { _longAndLatOfUser } = useContext(WeatherInfoContext);
    const { _isSearchResultsOn, _searchInput } = useContext(SearchContext);
    const [, setIsSearchResultsOn] = _isSearchResultsOn;
    const [, setLongAndLatOfUser] = _longAndLatOfUser
    const [, setSearchInput] = _searchInput;

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