

export const getTime = millis => {
    let date = new Date(millis * 1000);
    const options = {
        hour: 'numeric',
        minute: 'numeric'
    }
    return date.toLocaleTimeString('en-US', options);
}