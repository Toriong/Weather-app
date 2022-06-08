import history from "../history/history";


export const updateUrl = locationName => {
    const newPath = `/${locationName}`;

    history.push(newPath);
}