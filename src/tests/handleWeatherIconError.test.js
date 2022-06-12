import WeatherIconsAndDescriptions from '../data/WeatherIconsAndDescriptions.json'

// GOAL: if the weather icon is not found or if there is an error in displaying the weather icon, then by using the description that was attained form the api for the weather day, go through each object that is stored WeatherIconsAndDescriptions and check if the current description is stored in the array that is stored in descriptions. If it is then get the icon 
// GOAL: get the target icon in the array tha is stored in WeatherIconsAndDescriptions based on the description that is received from the api 
// the target icon is received 
// the description that is received from the api is present in one of the objects in WeatherIconsAndDescriptions array
// if the description that is received from the api for the day is present in one of the objects in the field of descriptions in WeatherIconsAndDescriptions array, then get the icon for the object 
// for the getIcon function, go through every object in that is stored in WeatherIconsAndDescriptions 
// the getIcon function takes in the description that is received from the api for the day  

const getIcon = description => {
    const targetIcon = WeatherIconsAndDescriptions.find(({ descriptions }) => {
        const isIconPresent = descriptions.find(_description => description.includes(_description.toLowerCase()))
        return isIconPresent;
    });

    return targetIcon.src;
}

test('Get icon', () => {
    const test1 = getIcon('Overcast clouds');

})

// GOAL:  Determine if it is night or day in the target description by using the sunset and sunrise time. If the current time in milliSeconds is pass the sunset time, then it is night at the target location. If the current time is before the sunset time but before the sunrise time, then it is day.




