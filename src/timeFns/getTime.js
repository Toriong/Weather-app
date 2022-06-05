import moment from 'moment'

// UNDER STAND THE FOLLOWING:
// moment.utc and its parameters
// .add and its parameters

export const getTime = (millis, timeZoneOffset) => moment.utc(millis, 'X').add(timeZoneOffset, 'seconds').format('LT');