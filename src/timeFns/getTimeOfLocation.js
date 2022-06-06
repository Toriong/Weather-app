
export const getTimeOfLocation = (timeZone, willGetOnlyDate) => {
    const options = {
        timeZone: timeZone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    if (willGetOnlyDate) {
        delete options.hour;
        delete options.minute;
    }

    let formatter = new Intl.DateTimeFormat([], options);

    return formatter.format(new Date())
}

// BUG: when the target location is on the following day in relation to the current time of the user, the date on first day (the current day) is the previous day 