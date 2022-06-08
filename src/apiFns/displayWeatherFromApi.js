import { updateUrl } from "../historyFns/updateUrl";
import { getTimeOfLocation } from "../timeFns/getTimeOfLocation";
import { getWeather } from "./getWeather";




export const displayWeatherFromApi = (vals, fns) => {
    console.log('vals: ', vals)
    const { longAndLat, isOnImperial, locationName, searchInput, wasBrowserDirectBtnClicked } = vals
    const { setWeather, setTargetLocation, setCurrentDate, setIsLoadingScreenOn, setIsWeatherDataReceived, setLongAndLatOfDisplayedWeather, setSearchInput, setPlaceHolderTxt } = fns;
    setWeather(null);
    setIsLoadingScreenOn(true);
    setIsWeatherDataReceived(false);
    getWeather(longAndLat, isOnImperial)
        .then(response => {

            const { weather, didError, errorMsg } = response;
            if (didError) {
                console.error('An error has occurred in getting weather of target location. Error message: ', errorMsg);
                alert('An error has occurred in getting weather of target location.')
                return;
            };
            if (!weather) {
                alert('Something went wrong, please refresh the page and try again.')
                return;
            }
            console.log(
                `weather: `, weather
            )
            const { daily, timezone, current, timezone_offset } = weather;
            console.log('bacon and cheese: ', timezone)
            const { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dew_point } = daily[0];
            daily.shift();
            daily.pop();
            setWeather({ daily, current: { ...current, averageForTheDay: { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dewPoint: dew_point } }, timezone })
            setCurrentDate(getTimeOfLocation(timezone, true))
            setTargetLocation(targetLocation => {
                return {
                    ...targetLocation,
                    name: locationName ?? searchInput,
                    time: getTimeOfLocation(timezone),
                    timeZoneOffset: timezone_offset
                }
            });
            setIsLoadingScreenOn(false);
            setIsWeatherDataReceived(true);
            setPlaceHolderTxt('Search by address, city name, or zip code')
            setLongAndLatOfDisplayedWeather(longAndLat);
            setSearchInput && setSearchInput(locationName);
            !wasBrowserDirectBtnClicked && updateUrl(locationName);
        })
}