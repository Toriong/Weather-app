const API_key = 'c0f45851ae0ccb974b0d53c18cdae059';

const convertCountryCodesToNames = locations => {
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return locations.map(location => {
        // the value that is stored in location.country is the country code
        const country = regionNames.of(location.country);

        return { ...location, country };
    });
}

// this fn will get the name of the city 
export const getReverseGeoCode = async coordinates => {
    const { longitude, latitude } = coordinates;
    const openWeatherApi = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_key}`
    const proxyServerUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(openWeatherApi)}`

    try {
        const response = await fetch(proxyServerUrl);
        if (response.ok) {
            const data = await response.json();
            const { status, contents } = data;
            if ((status?.http_code === 400) || !data) {
                alert('An error has occurred. Please refresh the page and try again.')
                return;
            };
            const locations = JSON.parse(contents);
            return { _locations: locations?.length ? convertCountryCodesToNames(locations) : [] };

        };
        alert('An error has occurred, please try again later.')
    } catch (error) {
        if (error) {
            console.error('An error has occurred: ', error)
            return { didError: true, errorMsg: error }
        }
    }
}

export const getGeoLocation = async input => {
    const openWeatherGeoLocationApi = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=10&appid=${API_key}`;
    const proxyServerUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(openWeatherGeoLocationApi)}`

    try {
        const response = await fetch(proxyServerUrl);
        if (response.ok) {
            const data = await response.json();
            const { status, contents } = data;
            if ((status?.http_code === 400) || !data) {
                alert('An error has occurred. Please refresh the page and try again.')
                return;
            };
            const locations = JSON.parse(contents);

            return { _locations: locations?.length ? convertCountryCodesToNames(locations) : [] };

        };
    } catch (error) {
        if (error) {
            console.error('An error has occurred: ', error)
            return { didError: true, errorMsg: error }
        }
    }

}




