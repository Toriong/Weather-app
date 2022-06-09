

const timeZoneDbApiKey = 'Q9PZ4G7HU34N'


// export const getLocationTime = async coordinates => {
//     const { longitude, latitude } = coordinates;
//     const timeZoneDbUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneDbApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`

//     try {
//         const response = await fetch(timeZoneDbUrl);
//         if (response) {
//             const time = await response.json();
//             return { time };
//         }
//     } catch (error) {
//         if (error) {
//             console.error('An error has occurred in getting the time of the target location: ', error)
//             return { didError: true }
//         }
//     }

// }