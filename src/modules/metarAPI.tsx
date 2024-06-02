import axios from "axios";

export const getMetar = async (icao: string): Promise<JSON> => {

    const apiURL = `
    'https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieved&format=json&stationString=${icao}&hoursBeforeNow=2`;

    return new Promise<JSON>((resolve, reject) => {
        axios.get(apiURL)
            .then((response) => {
                console.log(response);
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
    })
}