
// GOAL: if the time of the day is night, then present the night icon. Do so for vice-versa case.

export const getTimeOfLocation = (timeZone, willGetOnlyDate, willGetOnlyYear, willGetOnlyTime) => {
    let options = {
        timeZone: timeZone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }
    if (willGetOnlyDate) {
        delete options.hour;
        delete options.minute;
    }

    if (willGetOnlyYear) {
        delete options.hour;
        delete options.minute;
        delete options.month;
        delete options.day;
    }

    if (willGetOnlyTime) {
        delete options.year;
        delete options.month;
        delete options.day;

        options = {
            ...options,
            seconds: 'numeric'
        }
        console.log('hello there ', options)
    }




    let formatter = new Intl.DateTimeFormat([], options);

    return formatter.format(new Date())
}

