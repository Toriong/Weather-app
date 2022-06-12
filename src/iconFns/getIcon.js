// comment out when testing
// import WeatherIconsAndDescriptions from '../data/WeatherIconsAndDescriptions.json';
// used for testing
const WeatherIconsAndDescriptions = require('../data/WeatherIconsAndDescriptions.json');

// export
const getIcon = description => {
    const targetIcon = WeatherIconsAndDescriptions.find(({ descriptions }) => {
        const isIconPresent = !!descriptions.find(_description => description.toLowerCase() === _description.toLowerCase())
        return isIconPresent;
    });

    return targetIcon?.src;
}


// used for testing
module.exports = { getIcon };

