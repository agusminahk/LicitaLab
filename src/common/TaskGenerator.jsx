import React from 'react';
import { Box, Typography, Button, TextField, SvgIcon } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const TaskGenerator = (props) => {
    const { id, content, date, status, completed } = props.task;

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '7rem',
                boxShadow: '0 10px 60px 0 rgba(230, 230, 230, 0.8)',
                margin: '15px',
                borderRadius: '15px',
            }}
        >
            <Box sx={{ flex: 1 }}>{content}</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Calendario"
                        language="spanish"
                        value={date}
                        onChange={(newValue) => {}}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <SvgIcon component={AccessTimeFilledIcon} sx={{ color: 'green', margin: '0 20px' }} />
            </Box>
        </Box>
    );
};

export default TaskGenerator;
