import React from 'react';

import getSliderMarks from '../functions/getSliderMarks';
import getFiltersWithUpdatedSliderValues from '../functions/getFiltersWithUpdatedSliderValues';

import MaterialSlider from '@material-ui/core/Slider';

import { ActiveFilter } from '../interfaces/ActiveFilter';

type Props = {
    setActiveFilters: Function
    currentMinValue: number,
    currentMaxValue: number,
    scaleStep: number,
    minValue: number,
    maxValue: number,
    name: string,
    unit: string,
    tableLabel: string
}

export default function Slider ( { 
    setActiveFilters,
    currentMinValue,
    currentMaxValue,
    scaleStep,
    minValue,
    maxValue,
    name,
    unit,
    tableLabel
}: Props ) {

    const handleSliderChange = (name: string) => (event: any, value: number | number[]) => {
        if (Array.isArray(value)) {
            setActiveFilters((previousState: ActiveFilter[]) => 
                getFiltersWithUpdatedSliderValues(previousState, value[0], value[1], name));
        }
    }

    const isYear = (name === 'disc_year');

    return (
        <div>
            <h4>
                {tableLabel}
                {unit ? ' [' + unit + ']' : ''}
            </h4>
            <MaterialSlider
                defaultValue={[currentMinValue, currentMaxValue]}
                valueLabelDisplay="auto"
                step={scaleStep}
                marks={getSliderMarks(minValue, maxValue, unit, isYear)}
                min={minValue}
                max={maxValue}
                onChangeCommitted={handleSliderChange(name)}
            />
        </div>
    );
}