import React, { useState } from 'react';
import { Box, SvgIcon, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

import TaskGenerator from '../common/TaskGenerator';
import Form from './Form';

const Task = () => {
    const [showForm, setShowForm] = useState(false);
    const listaDeTareas = useSelector((state) => state.tasks.tasksList);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {listaDeTareas && listaDeTareas.map((task) => <TaskGenerator task={task} />)}

            <Box
                sx={{
                    display: 'flex',
                    width: '50%',
                    height: '7rem',
                    boxShadow: '0 10px 60px 0 rgba(230, 230, 230, 0.8)',
                    margin: '15px auto',
                    borderRadius: '15px',
                }}
            >
                <Button
                    variant="outlined"
                    component={AddIcon}
                    onClick={() => setShowForm(!showForm)}
                    sx={{
                        height: '100%',
                        width: '100%',
                        color: '#404040',
                        margin: 'auto',
                        fontSize: '5rem',
                        border: '1px solid #404040',
                        //borderRadius: '100%',
                    }}
                />
            </Box>

            <Form show={showForm} setShow={setShowForm} />
        </Box>
    );
};

export default Task;
