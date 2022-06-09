import history from "../history/history";


export const updateUrl = (_location, willReset) => {
    const { state, name, country } = _location ?? {};

    if (state) {
        var path = `${name}/${state}/${country}`;
    } else if (_location) {
        console.log('hello world')
        path = `${name}/${country}`
    }
    const newPath = willReset ? '/' : `/${path}`;

    history.push(newPath);
}