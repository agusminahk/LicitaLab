import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setTasks } from '../store/tasks.js';
import { defaultOrder, orderByExpire } from '../helpers/orderFunctions';
import Task from './Task.jsx';
import Header from './Header.jsx';
import { getJSDocReturnType } from 'typescript';

function App() {
    const dispatch = useDispatch();

    if (!window.localStorage.getItem('order')) window.localStorage.setItem('order', 'default');

    useEffect(() => {
        axios.get('/tasks').then((tareas) => {
            if (tareas.status === 200) {
                const orden = window.localStorage.getItem('order');

                if (orden === 'default') {
                    const tareasOrdenadasByDefault = defaultOrder(tareas.data);
                    return dispatch(setTasks(tareasOrdenadasByDefault));
                }

                if (orden === 'expire') {
                    const tareasOrdenadasByExpire = orderByExpire(tareas.data);
                    return dispatch(setTasks(tareasOrdenadasByExpire));
                }
            }
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
