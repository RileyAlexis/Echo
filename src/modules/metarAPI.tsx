import axios from "axios";

export const getMetar = async (icao: string): Promise<JSON> => {

    const apiURL = `
    https://aviationweather.gov/api/data/meter?ids=${icao}&format=json`

    console.log(apiURL);

    return new Promise<JSON>((resolve, reject) => {
        axios.get(apiURL)
            .then((response) => {
                console.log(response);
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
    })
}

export const getStarWars = async (): Promise<JSON> => {
    const apiURL = `https://swapi.dev/api/starships/9/`;

    return new Promise<JSON>((resolve, reject) => {
        axios.get(apiURL)
            .then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
    })
}