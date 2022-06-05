import moment from 'moment'


export const getTime = (millis, timeZoneOffset) => moment.utc(millis, 'X').add(timeZoneOffset, 'seconds').format('LT');