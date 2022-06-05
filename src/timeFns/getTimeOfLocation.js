
export const getTimeOfLocation = timeZone => {
    const options = {
        timeZone: timeZone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    let formatter = new Intl.DateTimeFormat([], options);

    return formatter.format(new Date())
}