import history from "../history/history";


export const updateUrl = (longAndLat, willReset) => {
    const { longitude, latitude } = longAndLat ?? {};
    const newPath = willReset ? '/' : `/${latitude}/${longitude}`;

    history.push(newPath);
}