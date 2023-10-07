import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
    isSidebarOpened: boolean,
    setIsSidebarOpened: Function
}

const useStyles = makeStyles({
    toolbar: {
        justifyContent: 'space-between'
    },
    filterIcon: {
        cursor: 'pointer'
    }
});

export default function Header( { isSidebarOpened, setIsSidebarOpened }: Props ) {

    const classes = useStyles();

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <Icon
                    onClick={() => {setIsSidebarOpened(!isSidebarOpened)}}
                    fontSize="large"
                    className={classes.filterIcon}
                >
                    filter_list
                </Icon>
                <h3>Exoplanets Archive</h3>
            </Toolbar>
        </AppBar>
    );
}