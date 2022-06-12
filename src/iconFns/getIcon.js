// comment out when testing
// import WeatherIconsAndDescriptions from '../data/WeatherIconsAndDescriptions.json';
// used for testing
const WeatherIconsAndDescriptions = require('../data/WeatherIconsAndDescriptions.json');

// export
const getIcon = description => {
    const targetIcon = WeatherIconsAndDescriptions.find(({ descriptions }) => {
        const isIconPresent = !!descriptions.find(_description => description.toLowerCase().includes(_description.toLowerCase()))
        console.log('isIconPresent: ', isIconPresent)
        return isIconPresent;
    });

    return targetIcon?.src;
}


// used for testing
module.exports = { getIcon };

