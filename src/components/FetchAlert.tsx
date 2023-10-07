import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
    didFetchFail: boolean
}

const useStyles = makeStyles({
    fetchAlert: {
        textAlign: 'center',
        position: 'absolute',
        left: '50%',
        top: '45%',
        transform: 'translate(-50%, -50%)'
    }
});

export default function FetchAlert( { didFetchFail }: Props ) {

    const classes = useStyles();
    
    return (
        <div className={classes.fetchAlert}>
            {
                didFetchFail ?
                <div>
                    <p>Error occured during fetch.</p>
                    <p>Loading fallback data from 11 Nov 2020...</p> 
                    <CircularProgress/>
                </div> :
                <div>
                    <p>Fetching data.</p> 
                    <p>Please wait...</p>
                    <CircularProgress/>
                </div>
            }
        </div>
    );
}