import { ActiveFilterValue } from './ActiveFilterValue';

export interface ActiveFilter {
    name?: string,
    tableLabel?: string,
    dataType?: string,
    minValue?: number,
    maxValue?: number,
    currentMinValue?: number,
    currentMaxValue?: number,
    values?: ActiveFilterValue[],
    unit?: string,
    scaleStep?: number
}