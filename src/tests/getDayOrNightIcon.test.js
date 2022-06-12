
const { getIcon } = require('../iconFns/getIcon');
const { getTotalMilliSecsOfDay } = require('../timeFns/getMilliSecondsOfDay');


const getDayOrNightIcon = (iconString, time, isMidnightSun, isPolarNight) => {
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


test('Get icon day or night string,  test1', () => {
    const iconStringTest1 = getIcon('Clear sky');
    const timeTest1 = { sunrise: '5:26 AM', sunset: '6:25 PM', currentTime: '3:17 AM' };
    const test1 = getDayOrNightIcon(iconStringTest1, timeTest1)
    expect(test1).toBe('01n');

    const iconStringTest2 = getIcon('Clear sky');
    const timeTest2 = { sunrise: '6:28 AM', sunset: '8:33 PM', currentTime: '2:33 PM' };
    const test2 = getDayOrNightIcon(iconStringTest2, timeTest2)
    expect(test2).toBe('01d');

    const iconStringTest3 = getIcon('Clear sky');
    const timeTest3 = { sunrise: '5:03 AM', sunset: '6:42 PM', currentTime: '10:42 PM' };
    const test3 = getDayOrNightIcon(iconStringTest3, timeTest3)
    expect(test3).toBe('01n');

    const iconStringTest4 = getIcon('Few clouds');
    const timeTest4 = { sunrise: '5:26 AM', sunset: '6:25 PM', currentTime: '3:17 AM' };
    const test4 = getDayOrNightIcon(iconStringTest4, timeTest4)
    expect(test4).toBe('02n');

    const iconStringTest5 = getIcon('Few clouds');
    const timeTest5 = { sunrise: '6:28 AM', sunset: '8:33 PM', currentTime: '2:33 PM' };
    const test5 = getDayOrNightIcon(iconStringTest5, timeTest5)
    expect(test5).toBe('02d');

    const iconStringTest6 = getIcon('Few clouds');
    const timeTest6 = { sunrise: '5:03 AM', sunset: '6:42 PM', currentTime: '10:42 PM' };
    const test6 = getDayOrNightIcon(iconStringTest6, timeTest6)
    expect(test6).toBe('02n');

    const iconStringTest7 = getIcon('Clear sky');
    const test7 = getDayOrNightIcon(iconStringTest7, null, false, true)
    expect(test7).toBe('01n');

    const iconStringTest8 = getIcon('Few clouds');
    const test8 = getDayOrNightIcon(iconStringTest8, null, true, false)
    expect(test8).toBe('02d');
})



