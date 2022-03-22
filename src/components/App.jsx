import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setTasks } from '../store/tasksSlice.js';
import Task from './Task.jsx';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/tasks').then((tareas) => {
            if (tareas.status === 200) dispatch(setTasks(tareas.data));
        });
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '60vw',
                margin: '20px auto',
                // alignItems: 'center',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography>Cosas por Hacer</Typography>
                <Box>fecha</Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Button> liberar seleccionados</Button>
                <Button>icono + order</Button>
                <Button>Filtro</Button>
            </Box>

            <Task />
        </Box>
    );
}

export default App;
