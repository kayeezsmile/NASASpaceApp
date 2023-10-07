import { Entry } from '../interfaces/Entry';
import { ActiveFilter } from '../interfaces/ActiveFilter';

export default function shouldBeFilteredOut(data: Entry, filters: ActiveFilter[]) {

    let shouldBeFilteredOut = false;

    filters.forEach(property => {

        const { name, currentMinValue, currentMaxValue, values } = property;

        if (name !== undefined) {
            if (currentMinValue !== undefined && currentMaxValue !== undefined) {
                if (parseFloat(data[name]) < currentMinValue || parseFloat(data[name]) > currentMaxValue) {
                    shouldBeFilteredOut = true;
                }
            } else if (values) {
                values.forEach(checkbox => {
                    if (checkbox.name === data[name] && !checkbox.isActive) {
                        shouldBeFilteredOut = true;
                    }
                });
            }
        }
    });

    return shouldBeFilteredOut;
}