import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Checkbox from '../components/Checkbox';
import CheckboxList from '../components/CheckboxList';
import Slider from '../components/Slider';

import { ActiveFilter } from '../interfaces/ActiveFilter';

type Props = {
    isSidebarOpened: boolean, 
    setIsSidebarOpened: Function, 
    activeFilters: ActiveFilter[], 
    setActiveFilters: Function
}

const useStyles = makeStyles({
    drawerPaper: {
        paddingLeft: '40px',
        paddingRight: '40px',
        width: '340px'
    }
});

export default function Filters({
    isSidebarOpened,
    setIsSidebarOpened,
    activeFilters,
    setActiveFilters
}: Props ) {

    const classes = useStyles();

    let inputs: React.ReactNode[] = [];

    activeFilters.forEach((activeFilter: any) => {

        const { 
            dataType,
            values,
            name,
            tableLabel,
            minValue,
            maxValue,
            unit,
            scaleStep,
            currentMinValue,
            currentMaxValue 
        } = activeFilter;

        if (dataType === 'text') {
            
            let checkboxes = values.map((value: any, index: number) =>
                <Checkbox
                    key={index}
                    value={value}
                    activeFilter={activeFilter}
                    setActiveFilters={setActiveFilters}
                />
            );

            inputs.unshift(
                <CheckboxList
                    key={name + '_label'}
                    tableLabel={tableLabel}
                    name={name}
                    checkboxes={checkboxes}
                    setActiveFilters={setActiveFilters}
                />
            );

        } else if (dataType === 'number') {

            inputs.push(
                <Slider
                    key={name + '_label'}
                    setActiveFilters={setActiveFilters}
                    currentMinValue={currentMinValue}
                    currentMaxValue={currentMaxValue}
                    scaleStep={scaleStep}
                    minValue={minValue}
                    maxValue={maxValue}
                    name={name}
                    unit={unit}
                    tableLabel={tableLabel}
                />
            );
        }
    });

    return (
        <Drawer 
            anchor="left"
            open={isSidebarOpened}
            onClose={() => {setIsSidebarOpened(!isSidebarOpened)}}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            {inputs}
        </Drawer>
    );
}