import React, { useState, useMemo } from 'react';
import PlanetCard from './PlanetCard';
import Paging from './Paging';
import { makeStyles } from '@material-ui/core/styles';

import { Entry } from '../interfaces/Entry';
import { ActiveFilter } from '../interfaces/ActiveFilter';
import { TableColumn } from '../interfaces/TableColumn';


import shouldEntryBeFilteredOut from '../functions/shouldEntryBeFilteredOut';

type Props = {
    planetaryData: Entry[],
    nasaData: any,
    activeFilters: ActiveFilter[],
    tableColumns: TableColumn[],
    refId: string,
}

const useStyles = makeStyles({
    main: {
        paddingTop: '0px'
    },
    planetList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '20px',
        paddingBottom: '20px'
    }
});

export default function PlanetList( { planetaryData, nasaData, activeFilters, tableColumns, refId }: Props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(24);

    const classes = useStyles();

    const planetaryDataAfterFiltering = useMemo(
        () => planetaryData.filter(element => !shouldEntryBeFilteredOut(element, activeFilters)
    ), [planetaryData, activeFilters]);

    const numberOfPages = Math.floor(planetaryDataAfterFiltering.length / itemsPerPage + 1);

    let planets = [];

    for (let i = (currentPage - 1) * itemsPerPage; i < currentPage * itemsPerPage; i++) {
        if (i < planetaryDataAfterFiltering.length) {
            planets.push(
                <PlanetCard 
                    data={planetaryDataAfterFiltering[i]}
                    nasaData={nasaData[planetaryDataAfterFiltering[i].pl_name]}
                    key={planetaryDataAfterFiltering[i].pl_name + '_' + i}
                    tableColumns={tableColumns}
                    refId={refId}
                />
            )
        }
    }

    return (
        <main className={classes.main}>        
            <Paging
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div className={classes.planetList}>{planets}</div>        
            <Paging
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </main>
    );
}