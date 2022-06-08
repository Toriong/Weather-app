
const API_key = 'c0f45851ae0ccb974b0d53c18cdae059';

// access the local storage here to check if the user is using imperial or metric units 

export const getWeather = async (coordinates, isImperial = true) => {
    console.log('coordinates: ', coordinates)
    const { longitude, latitude } = coordinates;
    const _units = isImperial ? 'imperial' : 'metric'


    // USE THIS API PATH TO GET USER'S LOCATION 
    // const openWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`
    const openWeatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${Number(latitude)}&lon=${Number(longitude)}&exclude=${null}&appid=${API_key}&units=${_units}`

    try {
        const response = await fetch(openWeatherAPI);
        if (response) {
            const data = await response.json();
            const { cod, message } = data;
            if (cod === '400') {
                console.error('Failed to get weather data. Error message: ', message)
                return null;
            }
            return { weather: data };
        }
    } catch (error) {
        if (error) {
            console.error('An error has occured: ', error);
            alert('Failed to get results, please try again later.')
            return { didError: true, errorMsg: error };
        }
    }

}