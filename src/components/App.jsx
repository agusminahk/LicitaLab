import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import { refresh } from '../helpers/requests.js';
import Task from './Task.jsx';
import Header from './Header.jsx';

function App() {
    const dispatch = useDispatch();

    // Creamos la key order si no existe y le asignamos default
    if (!window.localStorage.getItem('order')) window.localStorage.setItem('order', 'default');

    useEffect(() => {
        refresh(dispatch);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '60vw',
                margin: '20px auto',
            }}
        >
            <Header />
            <Task />
        </Box>
    );
}

export default App;
