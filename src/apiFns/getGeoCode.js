
const postionStackApiKey = '04f67790145823ecccf869bcdf43342d'

// use this function when the user enters in an address on the search bar 

export const getGeoCode = async address => {
    const postionStackUrl = `http://api.positionstack.com/v1/forward?access_key=${postionStackApiKey}&query=${address}`

    try {
        const response = await fetch(postionStackUrl);
        if (response.ok) {
            const addresses = await response.json();
            console.log('addresses: ', addresses);
            return { addresses };
        }
    } catch (error) {
        if (error) {
            console.error('An error has occurred: ', error)
            return { didError: true, errorMsg: error }
        }
    }

}


