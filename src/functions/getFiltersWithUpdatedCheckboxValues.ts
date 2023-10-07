import { ActiveFilter } from '../interfaces/ActiveFilter';
import { ActiveFilterValue } from '../interfaces/ActiveFilterValue';

export default function getFiltersWithUpdatedCheckboxValues(
    activeFilter: any,
    name: string, 
    filters: ActiveFilter[]
) {
    return filters.map(filter => {
        if (filter.name === activeFilter.name && filter.values !== undefined) {
            return {
                ...activeFilter,
                values: activeFilter.values.map((checkbox: ActiveFilterValue) => {
                    if (checkbox.name === name) {
                        return {
                            ...checkbox,
                            isActive: !checkbox.isActive
                        }
                    } else {
                        return checkbox;
                    }
                })
            }
        } else {
            return filter;
        }
    });
}