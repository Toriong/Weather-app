
const { getIcon } = require('../iconFns/getIcon');
const { getTime } = require('../timeFns/getTime');
// GOAL: this function will get the day icon or night icon depending on the time of the of the location

// if it is a polar night then use the day icon
// if midnight sun, then use the sun icon


// convert the target location time to milliSeconds when the user presses on a weather day card 

// use this function for the following:
// if it is the current day, then determine if the current time at the location is day or night
// if it is polar night, then return icon for the night
// if it is midnight sun, then return icon for the day

const getDayOrNightIcon = (iconString, time, valsForGetTimeFn) => {
    const { millis: currentTimeInMillis, timeZoneOffset } = valsForGetTimeFn;
    const { sunrise, sunset } = time;
    const _currentTime = getTime(currentTimeInMillis, timeZoneOffset, 'x');
    const isNight = (_currentTime > sunset) || (_currentTime < sunrise);


    return isNight ? `${iconString}n` : `${iconString}d`;
}


test.skip('Get icon day or night string.', () => {
    const iconStringTest1 = getIcon('Clear sky');
    // const isDCharAtEndOfString = iconStringTest1.slice(-1) === 'd';
    const time = { sunrise: 1654999425, sunset: 1655048538 };
    const valsForGetTimeFn = { millis: 1655083260000, timeZoneOffset: 10800 };
    const test1 = getDayOrNightIcon(iconStringTest1, time, valsForGetTimeFn);
    expect(test1).toBe('01n');

    const iconStringTest2 = getIcon('Clear sky');
    // const isDCharAtEndOfString = iconStringTest2.slice(-1) === 'd';
    const timeTest2 = { sunrise: 1655033326, sunset: 1655083987 };
    const valsForGetTimeFnTest2 = { millis: 1655054940000, timeZoneOffset: -18000 };
    const test2 = getDayOrNightIcon(iconStringTest2, timeTest2, valsForGetTimeFnTest2);
    expect(test2).toBe('01n');


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


