// import moment from 'moment'

// for testing:
let moment = require('moment')

// use 'x' for format to get the time in miliSeconds
// export
const getTime = (millis, timeZoneOffset, format) => moment.utc(millis, 'X').add(timeZoneOffset, 'seconds').format(format);

// for testing
module.exports = { getTime }
