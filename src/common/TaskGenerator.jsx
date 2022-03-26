import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, TextField, SvgIcon, Checkbox } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import { ContentPasteSearchTwoTone } from '@mui/icons-material';

import { updater } from '../helpers/requests.js';
import { taskStatus } from '../helpers/auxileFunctions.js';

const TaskGenerator = (props) => {
    const dispatch = useDispatch();
    const { id, task, expireAt, createAt, completed } = props.task;
    const [status, setStatus] = useState(taskStatus(expireAt));

    useEffect(() => {
        setStatus(taskStatus(expireAt)); // cuando la fecha sea actualizada refrescamos el componente
        const timer = () => setTimeout(() => setStatus(taskStatus(expireAt)), 15000);
        const timerId = timer();

        return () => {
            clearTimeout(timerId);
        };
    }, [expireAt || status]);

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '7rem',
                boxShadow: '0 10px 60px 0 rgba(230, 230, 230, 0.8)',
                margin: '15px',
                borderRadius: '15px',

                backgroundColor: status.color,
            }}
        >
            <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', margin: '0 10px' }}>
                <Checkbox sx={{ margin: '0px 10px' }} />
                <Typography>{task}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ backgroundColor: '#fff', color: '#fff' }}
                        label="Dia"
                        type="datetime-local"
                        name="expireAt"
                        fullWidth
                        value={expireAt}
                        onChange={(e) => updater(dispatch, { ...props.task, ['expireAt']: e.target.value })}
                    />
                </LocalizationProvider>
                <SvgIcon
                    component={status.icon}
                    fontSize="large"
                    sx={{
                        //backgroundColor: status.iconColor,
                        color: status.iconColor,
                        margin: '0 20px',
                        borderRadius: '50px',
                        boxShadow: '0 10px 60px 0 rgba(237, 237, 237, 0.8)',
                    }}
                />
            </Box>

            {/* 
            <Button
                component={EditIcon}
                variant="contained"
                color="action"
                sx={{
                    color: '#404040',
                    margin: 'auto',
                    fontSize: '10px',
                    height: '100%',
                    //  border: '1px solid #404040',
                    //borderRadius: '100%',
                }}
                onClick={() => handleChange()}
            /> */}
        </Box>
    );
};

export default TaskGenerator;
