
const API_key = 'c0f45851ae0ccb974b0d53c18cdae059';

export const getWeather = async coordinates => {
    const { longitude, latitude } = coordinates;
    // USE THIS API PATH TO GET USER'S LOCATION 
    // const openWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`
    const openWeatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${null}&appid=${API_key}`

    try {
        const response = await fetch(openWeatherAPI);
        if (response) {
            const weather = await response.json();
            console.log('weather: ', weather)
            return weather;
        }
    } catch (error) {
        if (error) {
            console.error('An error has occured: ', error);
            alert('Failed to get results, please try again later.')
        }
    }

}