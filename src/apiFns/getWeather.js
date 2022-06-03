
const API_key = 'c0f45851ae0ccb974b0d53c18cdae059';

// wind uses imperial units

export const getWeather = async (coordinates, isCelius) => {
    const { longitude, latitude } = coordinates;

    // USE THIS API PATH TO GET USER'S LOCATION 
    // const openWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`
    const openWeatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${null}&appid=${API_key}&units=imperial`

    try {
        const response = await fetch(openWeatherAPI);
        if (response) {
            const weather = await response.json();
            console.log('weather and bacon: ', weather)
            return { weather };
        }
    } catch (error) {
        if (error) {
            console.error('An error has occured: ', error);
            alert('Failed to get results, please try again later.')
            return { didError: true };
        }
    }

}