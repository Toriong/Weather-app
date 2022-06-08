import history from "../history/history";


export const updateUrl = (locationName, willReset) => {
    const newPath = willReset ? '/' : `/${locationName}`;

    history.push(newPath);
}