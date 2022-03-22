import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import TaskGenerator from '../common/TaskGenerator';

const Task = () => {
    const listaDeTareas = useSelector((state) => state.tasks.tasksList);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {listaDeTareas && listaDeTareas.map((task) => <TaskGenerator task={task} />)}
        </Box>
    );
};

export default Task;
