import moment from 'moment'

// use 'x' for format to get the time in miliSeconds
export const getTime = (millis, timeZoneOffset, format) => moment.utc(millis, 'X').add(timeZoneOffset, 'seconds').format(format);