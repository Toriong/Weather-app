
import React, { useEffect } from 'react';
import SearchResult from './SearchResult';
import '../../../css/comp-css/modals/searchResults.css'

const SearchResults = ({ searchResults, isLoadingResults }) => {
    useEffect(() => {
        window.addEventListener('touchstart', () => {
            console.log("'Unable to preventDefault inside passive event listener due to target being treated as passive' bug has been stopped.")
        }, { passive: false });
    }, []);


    return (
        <div className='searchResultsModal'>
            {isLoadingResults ?
                <span>Loading results...</span>
                :
                searchResults?.length ?
                    searchResults.map((searchResult, index) => {
                        return <SearchResult
                            searchResult={searchResult}
                            index={index}
                        />
                    })
                    :
                    <span>No results found</span>

            }
        </div>
    )
}

export default SearchResults