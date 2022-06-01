
const API_key = 'c0f45851ae0ccb974b0d53c18cdae059';

export const getUserCityName = async coordinates => {
    const { longitude, latitude } = coordinates;
    // USE THIS API PATH TO GET USER'S LOCATION 
    // const openWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`
    // 51.5085, -0.1257
    const openWeatherAPI = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API_key}`
    const proxyServerUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(openWeatherAPI)}`


    try {
        const response = await fetch(proxyServerUrl);
        console.log('response: ', response)
        if (response) {
            const data = await response.json();
            const location = JSON.parse(data.contents)
            console.log('location of user: ', location)
            return location?.[0];
        }
    } catch (error) {
        if (error) {
            console.error('An error has occured: ', error);
            return { isError: true, errorMsg: error };
        }
    }
}