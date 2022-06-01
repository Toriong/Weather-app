const postionStackApiKey = '04f67790145823ecccf869bcdf43342d';

// write an article about using a proxy server to solve cors error 

// use this function when the user enters in an address on the search bar 

export const getGeoCode = async (address) => {
    const positionStackUrl = `http://api.positionstack.com/v1/forward?access_key=${postionStackApiKey}&query=${address}`
    const proxyServerUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(positionStackUrl)}`

    try {
        const response = await fetch(proxyServerUrl)
        console.log('response: ', response)
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

export const getReverseGeoCode = async coordinates => {
    const { longitude, latitude } = coordinates;
    const _query = `${latitude}, ${longitude}`;
    console.log('_query: ', _query)
    const positionStackUrl = `http://api.positionstack.com/v1/reverse?access_key=${postionStackApiKey}&query=${_query}`
    const proxyServerUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(positionStackUrl)}`

    try {
        const response = await fetch(proxyServerUrl)
        console.log('response: ', response)
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




