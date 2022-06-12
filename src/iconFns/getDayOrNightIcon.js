import getTotalMilliSecsOfDay from '../timeFns/getMilliSecondsOfDay'

// for testing
// const { getTotalMilliSecsOfDay } = require("../timeFns/getMilliSecondsOfDay");



export const getDayOrNightIcon = (iconString, time, isMidnightSun, isPolarNight, isPresentDay) => {
    if (!isMidnightSun && !isPolarNight && isPresentDay) {
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

    if (isPolarNight && isPresentDay) {
        var _iconString = `${iconString}n`
    }

    return _iconString ?? `${iconString}d`
}


module.router = { getDayOrNightIcon };



