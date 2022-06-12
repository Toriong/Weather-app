import { updateUrl } from "../historyFns/updateUrl";
import { getTimeOfLocation } from "../timeFns/getTimeOfLocation";
import { getWeather } from "./getWeather";




export const displayWeatherFromApi = (vals, fns) => {
    const { longAndLat, isOnImperial, location, searchInput, willUpdateUrl } = vals
    const { setWeather, setTargetLocation, setCurrentDate, setIsLoadingScreenOn, setIsWeatherDataReceived, setLongAndLatOfDisplayedWeather, setSearchInput, setPlaceHolderTxt, clearTimerGetWeather } = fns;
    setWeather(null);
    setIsLoadingScreenOn(true);
    setIsWeatherDataReceived(false);
    getWeather(longAndLat, isOnImperial)
        .then(response => {
            clearTimerGetWeather()
            const { weather, didError, errorMsg } = response ?? {}
            if (didError || (response === null)) {
                console.error('An error has occurred in getting weather of target location. Error message: ', errorMsg);
                alert('An error has occurred in getting weather of target location.')
                return;
            };
            if (!weather) {
                alert('Something went wrong, please refresh the page and try again.')
                return;
            }
            const { country, state, name } = location;

            if (state && (name !== state)) {
                var _location = `${name}, ${state}, ${country}`
            } else if (state && country) {
                _location = `${state}, ${country}`;
            } else if (name && country) {
                _location = `${name}, ${country}`;
            } else {
                _location = name;
            }

            const { daily, timezone, current, timezone_offset } = weather;
            const { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dew_point } = daily[0];
            daily.shift();
            daily.pop();
            setWeather({ daily, current: { ...current, averageForTheDay: { temp, feels_like, weather: weatherMoreInfo, humidity, sunrise, sunset, wind_speed, rain, snow, dewPoint: dew_point } }, timezone })
            setCurrentDate(getTimeOfLocation(timezone, true))
            setTargetLocation(targetLocation => {
                return {
                    ...targetLocation,
                    name: _location ?? searchInput,
                    time: getTimeOfLocation(timezone),
                    timeZoneOffset: timezone_offset
                }
            });
            setIsLoadingScreenOn(false);
            setIsWeatherDataReceived(true);
            setPlaceHolderTxt('Search by city name')
            setLongAndLatOfDisplayedWeather(longAndLat);
            setSearchInput && setSearchInput(_location);
            willUpdateUrl && updateUrl(location);
        })
}