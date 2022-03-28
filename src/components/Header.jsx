import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import TasksOrderButton from './TasksOrderButton';
import { changeTaskStatus } from '../helpers/requests';
import Filters from './Filters';

const Header = () => {
    const dispatch = useDispatch();
    const releaseTasks = useSelector((state) => state.releaseTasks);

    const today = () => {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        let mm = hoy.getMonth() + 1; // Months start at 0!
        let dd = hoy.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '10px 0px' }}>
                <Typography variant="h3">Cosas por Hacer</Typography>
                <Typography variant="h6">Hoy es: {today()} </Typography>
            </Box>
            <Divider sx={{ marginBottom: '20px' }} />
            <Box sx={{ alignItems: 'left', margin: '25px' }}>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                        changeTaskStatus(dispatch, releaseTasks);
                    }}
                >
                    Liberar Seleccionados
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <Filters />
                <TasksOrderButton />
            </Box>
        </Box>
    );
};

export default Header;
