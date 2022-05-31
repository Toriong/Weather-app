
const API_key = '04f67790145823ecccf869bcdf43342d'

// use this function when the user enters in an address on the search bar 

export const getGeoCode = async address => {
    const API_url = `http://api.positionstack.com/v1/forward?access_key=${API_key}&query=${address}`

    try {
        const response = await fetch(API_url);
        if (response.ok) {
            const address = await response.json();
            console.log('address: ', address);
        }
    } catch (error) {
        if (error) {
            console.error('An error has occurred: ', error)
        }
    }

}


