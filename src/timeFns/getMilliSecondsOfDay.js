
// export
const getTotalMilliSecsOfDay = timeHHMM => {
    const currentTimeArray = timeHHMM.split(':').map(val => val.split(" ")).flat();
    if (currentTimeArray[currentTimeArray.length - 1] === 'PM') {
        var hoursInt = Number(currentTimeArray[0]) + 12;
        var secondsInt = Number(currentTimeArray[1]);
        hoursInt = (hoursInt === 24) ? 0 : hoursInt;
        var hoursInMilliseconds = (hoursInt > 0) ? (hoursInt * 3_600_000) : hoursInt;
        var secondsInMilliseconds = (secondsInt > 0) ? (secondsInt * 1_000) : secondsInt;
        if (!hoursInMilliseconds && !secondsInMilliseconds) {
            return 0
        };
        if (!hoursInMilliseconds) {
            return secondsInMilliseconds;
        }
        if (!hoursInMilliseconds) {

            return hoursInMilliseconds;
        }
        return hoursInMilliseconds + secondsInMilliseconds
    }
    hoursInt = Number(currentTimeArray[0]);
    secondsInt = Number(currentTimeArray[1]);
    hoursInMilliseconds = hoursInt * 3_600_000
    secondsInMilliseconds = (secondsInt > 0) ? (secondsInt * 1_000) : secondsInt;
    if (!secondsInMilliseconds) {
        return hoursInMilliseconds;
    }

    return hoursInMilliseconds + secondsInMilliseconds;
}

module.exports = {
    getTotalMilliSecsOfDay
}