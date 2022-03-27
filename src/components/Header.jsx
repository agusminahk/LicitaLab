import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import TasksOrderButton from './TasksOrderButton';
import { changeTaskStatus } from '../helpers/requests';
import Filters from './Filters';

const Header = () => {
    const dispatch = useDispatch();
    const releaseTasks = useSelector((state) => state.releaseTasks);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography>Cosas por Hacer</Typography>
                <Box>fecha</Box>
            </Box>
            <Box sx={{ alignItems: 'left', margin: '20px' }}>
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
