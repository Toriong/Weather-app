import React, { useEffect } from 'react'

// GOAL:
// create the weather section for the UI:
// will have the header for the section that will display the label that is in the input
// will have weather card section: this section will display the 7 day forecast for each day, each day will presented onto a card that wil consist of the following:



// GOAL:
// have the date appear on every single weather card day on the UI

// the date for each card is on

const WeatherSection = ({ timeOfLocation, weatherOfDays }) => {
    useEffect(() => {
        console.log('weatherOfDays, steaksssss: ', weatherOfDays)
    });


    // GOAL: the following will be displayed onto the DOM:
    // the date 
    // the temperature
    // the animation depending on the weather type (EXAMPLE: if the cloudy, then show a cloudy animation)  


    // GOAL: if x is the current date and y is the index of the weatherOfDays array, then get the date of the following day: x + y
    // x + y date is displayed onto the DOM 
    // use the following to make the date shorter: .toLocaleDateString('en-US',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    // change the miliSeconds to a date 
    // you will get the date of x + y date in miliSeconds 
    // end of storing in dateInMiliSeconds
    // pass the following for the setDate method that is being applied to currentDate: today's date (currentDate.getDate()) + 1)
    // apply the setDate method to the current date var
    // store the following above into dateInMiliSeconds
    // declare dateInMiliSeconds var 
    // get the currentDate
    const currentDate = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    return (
        <section>
            {!!weatherOfDays?.length &&
                weatherOfDays.map((day, index) => {
                    console.log('weather day: ', day)
                    const _day = currentDate.getDate() + index
                    console.log('_day: ', _day);
                    let dateInMiliSeconds = currentDate.setDate(_day);
                    const letterDate = new Date(dateInMiliSeconds);
                    const letterDateShorten = letterDate.toLocaleDateString('en-US', dateOptions);
                    console.log('letterDateShorten: ', letterDateShorten)
                    return <div className='weatherDayCard'>

                    </div>
                })
            }
        </section>
    )
}

export default WeatherSection