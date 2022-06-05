import React, { useEffect } from 'react';
import SearchResult from './SearchResult';
import '../../../css/comp-css/modals/searchResults.css'
import { useContext } from 'react';
import { WeatherInfoContext } from '../../../provider/WeatherInfoProvider';

const SearchResults = ({ searchResults, isLoadingResults }) => {

    return (
        <div className='searchResultsModal'>
            {isLoadingResults ?
                <span>Loading results...</span>
                :
                searchResults?.length ?
                    searchResults.map(searchResult => {
                        const { latitude, longitude, label } = searchResult;
                        return <SearchResult
                            latitude={latitude}
                            longitude={longitude}
                            label={label}
                        />
                    })
                    :
                    <span>No results found</span>

            }
        </div>
    )
}

export default SearchResults