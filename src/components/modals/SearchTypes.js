import React from 'react';
import '../../css/comp-css/modals/searchTypeModal.css'


// NOTES:



const SearchTypes = () => {
    return (
        <div className='searchTypesModal'>
            <button>By city</button>
            <button>By address</button>
            <button>By zip code</button>
            <button>My location</button>
        </div>
    )
}

export default SearchTypes