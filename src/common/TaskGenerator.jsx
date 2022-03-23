import React from 'react';
import { Box, Typography, Button, TextField, SvgIcon, Checkbox } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import { ContentPasteSearchTwoTone } from '@mui/icons-material';

const TaskGenerator = (props) => {
    const { id, content, date, status, completed } = props.task;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', margin: '0 10px' }}>
                    <Checkbox sx={{ margin: '0px 10px' }} />
                    <Typography>{content}</Typography>
                </Box>

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
                    <SvgIcon
                        component={AccessTimeFilledIcon}
                        fontSize="large"
                        sx={{ color: 'green', margin: '0 20px', boxShadow: '0 10px 60px 0 rgba(237, 237, 237, 0.8)' }}
                    />
                </Box>
            </Box>

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
            />
        </Box>
    );
};

export default TaskGenerator;
