import history from "../history/history";


export const updateUrl = (_location, willReset) => {
    const { state, name, country: _countryCode, countryCode } = _location ?? {};

    if (state) {
        var path = `${name}/${state}/${countryCode ?? _countryCode}`;
    } else if (_location) {
        console.log('hello world')
        path = `${name}/${countryCode ?? _countryCode}`
    }
    const newPath = willReset ? '/' : `/${path}`;
    debugger

    history.push(newPath);
}