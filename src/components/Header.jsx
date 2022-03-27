import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import TasksOrderButton from './TasksOrderButton';
import { changeTaskStatus } from '../helpers/requests';

const Header = () => {
    const dispatch = useDispatch();
    const releaseTasks = useSelector((state) => state.releaseTasks);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography>Cosas por Hacer</Typography>
                <Box>fecha</Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button
                    onClick={() => {
                        changeTaskStatus(dispatch, releaseTasks);
                    }}
                >
                    liberar seleccionados
                </Button>
                <Box sx={{ display: 'flex' }}>
                    <TasksOrderButton />
                    {/* <Button startIcon={<FilterListIcon />}>Order</Button> */}
                    <Button>Filtro</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
