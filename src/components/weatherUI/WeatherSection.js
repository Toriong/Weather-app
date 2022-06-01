import React, { useEffect } from 'react'

// GOAL:
// create the weather section for the UI:
// will have the header for the section that will display the label that is in the input
// will have weather card section: this section will display the 7 day forecast for each day, each day will presented onto a card that wil consist of the following:



// GOAL:
// have the date appear on every single weather card day on the UI

// the date for each card is on

const WeatherSection = ({ targetLocation, weatherOfDays }) => {



    // GOAL: the following will be displayed onto the DOM:
    // the date 
    // the temperature
    // the animation depending on the weather type (EXAMPLE: if the cloudy, then show a cloudy animation)  

    // GOAL: get the date for each day in the weather forecast 
    // the date is displayed for each weather day
    // the date is converted into letters instead of numbers (June 1, 2022)
    // for each weather card, get the target date in miliseconds 
    // store the current date into currentDate  


    useEffect(() => {
        console.log('targetLocation: ', targetLocation)
    })

    const getMonthName = monthNumber => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', {
            month: 'long',
        });
    }


    return (
        <section>
            {!!weatherOfDays?.length &&
                weatherOfDays.map((day, index) => {
                    let targetDate = new Date();
                    targetDate.setDate(targetDate.getDate() + index);
                    let _day = targetDate.getDate();
                    let year = targetDate.getFullYear();
                    const monthName = getMonthName(targetDate.getMonth() + 1)
                    const date = `${monthName} ${_day}, ${year}`;
                    console.log('bacon: ', date);

                    return <div className='weatherDayCard'>

                    </div>
                })
            }
        </section>
    )
}

export default WeatherSection