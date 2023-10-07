import { ActiveFilter } from '../interfaces/ActiveFilter';

export default function getFiltersWithUpdatedSliderValues(
    filters: ActiveFilter[],
    newCurrentMin: number,
    newCurrentMax: number,
    name: string
) {
    return filters.map(filter => {
        if (filter.name === name) {
            return {
                ...filter,
                currentMinValue: newCurrentMin,
                currentMaxValue: newCurrentMax
            }
        } else {
            return filter;
        }
    });
}