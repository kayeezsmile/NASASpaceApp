import { Entry } from '../interfaces/Entry';

// This function will remove some of the entries so only one entry
// per planet will remain - the one with most recent release date.

export default function getUniquePlanets(data: Entry[]) {

    let strippedData = [];
    let mostRecentDateIndex = 0;

    for (let i = 1; i < data.length; i++) {
        if (data[i].pl_name === data[i-1].pl_name) {
            let currentDate = new Date(data[i].releasedate);
            let previousDate = new Date(data[i-1].releasedate);
            if (currentDate > previousDate) {
                mostRecentDateIndex = i;
            }
        } else {
            strippedData.push(data[mostRecentDateIndex]);
            mostRecentDateIndex = i;
        }
    }

    return strippedData;
}