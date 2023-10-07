import { ActiveFilter } from '../interfaces/ActiveFilter';
import { ActiveFilterValue } from '../interfaces/ActiveFilterValue';
import { Entry } from '../interfaces/Entry';
import { TableColumn } from '../interfaces/TableColumn';

export default function getInitiallyActiveFilters (
    planetaryData: Entry[],
    tableColumns: TableColumn[]
) {

    let initiallyActiveFilters: ActiveFilter[] = [];

    tableColumns.forEach(element => {

        const { 
            usedInForm, 
            tableLabel, 
            dataType, 
            databaseColumnName, 
            minValue, 
            maxValue, 
            unit, 
            scaleStep 
        } = element;

        if (usedInForm) {

            if (dataType === 'number') {

                initiallyActiveFilters.push({
                    name: databaseColumnName,
                    tableLabel,
                    dataType,
                    minValue,
                    maxValue,
                    currentMinValue: minValue,
                    currentMaxValue: maxValue,
                    unit,
                    scaleStep
                });

            } else {

                let values: ActiveFilterValue[] = [];

                planetaryData.forEach(entry => {
                    let isInArray = false;
                    values.forEach(value => {
                        if (value.name === entry[databaseColumnName]) {
                            isInArray = true;
                        }
                    });
                    if (!isInArray) {
                        values.push({
                            name: entry[databaseColumnName],
                            isActive: true
                        });
                    }
                });
                
                initiallyActiveFilters.push({
                    name: databaseColumnName,
                    tableLabel,
                    dataType,
                    values
                });
            }
        }
    });

    return initiallyActiveFilters;
}