import getTotalMilliSecsOfDay from '../timeFns/getMilliSecondsOfDay'

// for testing
// const { getTotalMilliSecsOfDay } = require("../timeFns/getMilliSecondsOfDay");



export const getDayOrNightIcon = (iconString, time, isMidnightSun, isPolarNight) => {
    if (!isMidnightSun && !isPolarNight) {
        const { sunrise, sunset, currentTime } = time;
        const sunriseMilliSeconds = getTotalMilliSecsOfDay(sunrise);
        const sunsetMilliSeconds = getTotalMilliSecsOfDay(sunset);
        const currentTimeMilliSeconds = getTotalMilliSecsOfDay(currentTime);

        const isNight = currentTimeMilliSeconds > sunsetMilliSeconds;
        const isSunNotRisen = currentTimeMilliSeconds < sunriseMilliSeconds;

        if (isNight || isSunNotRisen) {
            return `${iconString}n`
        }
    }

    if (isPolarNight) {
        var iconStringNight = `${iconString}n`
    }


    return iconStringNight ?? `${iconString}d`
}


module.router = { getDayOrNightIcon };



