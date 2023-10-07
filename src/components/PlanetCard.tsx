import React, { useMemo } from 'react';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import getRoundedValue from '../functions/getRoundedValue';

import { Entry } from '../interfaces/Entry';
import { TableColumn } from '../interfaces/TableColumn';

type Props = {
    data: Entry,
    tableColumns: TableColumn[]
}

const useStyles = makeStyles({
    card: {
        width: '250px',
        padding: '10px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    planetIcon: {
        width: '70px',
        height: '70px'
    },
    dataRow: {
        marginTop: '4px',
        marginBottom: '4px'
    }
});

export default function PlanetCard( { data, tableColumns }: Props ) {

    const classes = useStyles();

    const dataForDisplay = useMemo(
        () => {
            let dataRows = [];
            for (const property in data) {
                for (let i = 0; i < tableColumns.length; i++) {
                    if (tableColumns[i].databaseColumnName === property && 
                        tableColumns[i].databaseColumnName !== 'pl_name') {
                        let value;
                        if (tableColumns[i].dataType === 'number') {
                            value = getRoundedValue(data[property]);
                        } else {
                            value = data[property];
                        }
                        
                        const label = tableColumns[i].tableLabel;
                        const unit = tableColumns[i].unit;
                        dataRows.push(
                            <div 
                                className={classes.dataRow}
                                key={label}
                            >
                                <strong>{label}: </strong>
                                <span>{value} {unit}</span>
                            </div>
                        );
                    }
                }
            }
            return dataRows;
        },
        [data, tableColumns, classes.dataRow]
    );

    const { pl_dens, pl_name } = data;

    return (
        <Card 
            variant="outlined"
            className={classes.card}
        >
            <img
                src={parseFloat(pl_dens) < 2 ? 'gas-giant.svg' : 'rocky-planet.svg'}
                className={classes.planetIcon}
                alt="Planet"
            />
            <h4>{pl_name}</h4>
            {dataForDisplay}
        </Card>
    );
}