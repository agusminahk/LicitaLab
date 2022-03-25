import React, { useState } from 'react';
import { Box, SvgIcon, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import TaskGenerator from '../common/TaskGenerator';
import { sendUpdateRequest } from '../store/tasks';
import Form from './CreateFormTask';

const Task = () => {
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState(false);

    const listaDeTareas = useSelector((state) => state.tasks);

    const handleChange = () => {
        dispatch(sendUpdateRequest({ content: 'UPDATEEE2', id: 1 }));
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {listaDeTareas &&
                listaDeTareas.map((task) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TaskGenerator task={task} />
                        <Button
                            component={EditIcon}
                            variant="contained"
                            color="info"
                            sx={{
                                color: '#fff',
                                margin: 'auto 10px',
                                fontSize: '10px',
                                height: '100%',
                            }}
                            onClick={() => {
                                setEdit(!edit);
                                setShowForm(!showForm);
                            }}
                        />
                        <Button
                            component={DeleteIcon}
                            variant="contained"
                            color="error"
                            sx={{
                                color: '#fff',
                                margin: 'auto',
                                fontSize: '10px',
                                height: '100%',
                            }}
                            // onClick={() => {
                            //     setEdit(!edit);
                            //     setShowForm(!showForm);
                            // }}
                        />
                    </Box>
                ))}

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

            <Form show={showForm} setShow={setShowForm} setEdit={setEdit} type={(edit && 'editTask') || 'createTask'} />
        </Box>
    );
};

export default Task;
