import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, SvgIcon, Checkbox } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { setReleasedTask } from '../store/releaseTasks';
import { updater } from '../helpers/requests.js';
import { taskStatus } from '../helpers/auxileFunctions.js';

const TaskGenerator = (props) => {
    const dispatch = useDispatch();
    const releaseTasks = useSelector((state) => state.releaseTasks);

    const { id, task, expireAt, createAt, completed } = props.task;
    const [status, setStatus] = useState(taskStatus(expireAt, completed));
    const [check, setCheck] = useState(completed);

    useEffect(() => {
        setStatus(taskStatus(expireAt, completed)); // cuando la fecha sea actualizada refrescamos el componente

        const timer = () => setTimeout(() => setStatus(taskStatus(expireAt, completed)), 15000);
        const timerId = timer();

        return () => {
            clearTimeout(timerId); // limpiamos y optimizamos la memoria que consume nuestro timeOut
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
                <Checkbox
                    checked={check}
                    value={check}
                    sx={{ margin: '0px 10px' }}
                    disabled={(completed && true) || false}
                    onChange={(e) => {
                        setCheck(e.target.checked);
                        if (!check) {
                            const release = [...releaseTasks, props.task];
                            dispatch(setReleasedTask(release));
                        } else {
                            const notReleaseYet = releaseTasks.filter((task) => task.id !== id);
                            dispatch(setReleasedTask(notReleaseYet));
                        }
                    }}
                />
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
                        color: status.iconColor,
                        margin: '0 20px',
                        borderRadius: '50px',
                        boxShadow: '0 10px 60px 0 rgba(237, 237, 237, 0.8)',
                    }}
                />
            </Box>
        </Box>
    );
};

export default TaskGenerator;
