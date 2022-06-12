const WeatherIconsAndDescriptions = require('../data/WeatherIconsAndDescriptions.json')


const getIcon = description => {
    const targetIcon = WeatherIconsAndDescriptions.find(({ descriptions }) => {
        const isIconPresent = !!descriptions.find(_description => description.toLowerCase().includes(_description.toLowerCase()))
        console.log('isIconPresent: ', isIconPresent)
        return isIconPresent;
    });

    return targetIcon?.src;
}

test('Get icon', () => {
    const test1 = getIcon('Overcast clouds');
    const test2 = getIcon('Clear sky');
    const test3 = getIcon('asl;dfjsf;');
    const test4 = getIcon('Light shower sleet');
    const test5 = getIcon('volcanic ash');
    const test6 = getIcon('dust whirls');
    expect(test1).toBe("02");
    expect(test2).toBe("01");
    expect(test3).toBe(undefined);
    expect(test4).toBe('13d');
    expect(test5).toBe('50d');
    expect(test6).toBe('50d');

})






