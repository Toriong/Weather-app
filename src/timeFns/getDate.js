

export const getMonthName = monthNumber => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', { month: 'long', });
};

export const getDate = index => {
    let targetDate = new Date();
    const newDate = index ? (targetDate.getDate() + index) : targetDate.getDate();
    targetDate.setDate(newDate);
    let _day = targetDate.getDate();
    let year = targetDate.getFullYear();
    const monthName = getMonthName(targetDate.getMonth() + 1)
    const date = `${monthName} ${_day}, ${year}`;

    return date;
}