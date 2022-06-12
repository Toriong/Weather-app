
const { getTime } = require('../timeFns/getTime');
// GOAL: this function will get the day icon or night icon depending on the time of the of the location

// use this function only for current day 
const getDayOrNightIcon = (iconString, time, getTimeVals) => {
    const { millis, timeZoneOffset } = getTimeVals;
    const { sunrise, sunset, currentTime } = time;
    const _currentTime = getTime(millis, timeZoneOffset, 'x');
    const isNight = (_currentTime > sunset) && (_currentTime < sunrise);

    return isNight ? `${iconString}n` : `${iconString}d`
}


test('Get icon', () => {
    const timeTest1 = {}
    const test1 = getDayOrNightIcon('Overcast clouds');


})

// BRAIN DUMP NOTES:
// get the sunrise time and the sunset time of the current day
// get the current time of the location that was selected by the current user

// CASE 1: it passed the sunset time,  
// GOAL: get the night icon 
// 'n' is added to the icon string
// the current time for the target location is passed the sunset time
// if the current time is passed the sunset time, then add an n to the icon 
// the sun rise time and the sunset time is received for the getDayOrNightIcon fn 
// the current time received (under the field name of dt) for the getDayOrNightIcon fn 
// the icon string is passed to the function


