
export const getSearchTypeTxt = txt => {
    if (txt === "Using your location. Press the 'search' icon to get results") {
        var searchTypeTxt = 'My location';
    } else if (txt === 'Search by city name') {
        searchTypeTxt = 'By city';
    }

    return searchTypeTxt;
}