import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { getTasks } from '../store/tasks.js';
import Task from './Task.jsx';
import Header from './Header.jsx';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/tasks?completed=false').then((tareas) => {
            if (tareas.status === 200) dispatch(getTasks(tareas.data));
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
            <Header />

            <Task />
        </Box>
    );
}

export default App;
