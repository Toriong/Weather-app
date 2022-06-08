import { AiOutlineConsoleSql } from "react-icons/ai";

const positionStackApiKey = '04f67790145823ecccf869bcdf43342d';
const API_key = 'c0f45851ae0ccb974b0d53c18cdae059';

// write an article about using a proxy server to solve cors error 

// use this function when the user enters in an address on the search bar 

export const getGeoCode = async (address) => {
    const positionStackUrl = `http://api.positionstack.com/v1/forward?access_key=${positionStackApiKey}&query=${address}`
    const proxyServerUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(positionStackUrl)}`

    try {
        const response = await fetch(proxyServerUrl);
        if (response.ok) {
            const data = await response.json();
            console.log('data: ', data)
            const addresses = JSON.parse(data.contents).data;
            return { addresses };
        };
        alert('An error has occurred, please try again later.')
    } catch (error) {
        if (error) {
            console.error('An error has occurred: ', error)
            return { didError: true, errorMsg: error }
        }
    }
}

const convertToCountryName = locations => {
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    var _locations = locations.map(location => {
        // the value that is stored in location.country is the country code
        const country = regionNames.of(location.country);

        return { ...location, country };
    });

    return _locations
}

// use this to get the city name of the target location
export const getReverseGeoCode = async coordinates => {
    const { longitude, latitude } = coordinates;

    const _longitude = Number(latitude).toFixed(4);

    const openWeatherApi = `http://api.openweathermap.org/geo/1.0/reverse?lat=${Number(latitude).toFixed(8)}&lon=${Number(longitude).toFixed(8)}&limit=5&appid=${API_key}`
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
            return { _locations: locations?.length ? convertToCountryName(locations) : [] };

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
            let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
            if (locations.length) {
                var _locations = locations.map(location => {
                    const country = regionNames.of(location.country);

                    return { ...location, country };
                });
            };

            console.log('_locations: ', _locations)
            return { _locations: _locations?.length ? _locations : [] }


        };
        // alert('An error has occurred, please try again later.')
    } catch (error) {
        if (error) {
            console.error('An error has occurred: ', error)
            return { didError: true, errorMsg: error }
        }
    }

}




