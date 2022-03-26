import React, { useState } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import TaskGenerator from '../common/TaskGenerator';
import Form from './Form';
import { taskStatus } from '../helpers/auxileFunctions.js';

const Task = () => {
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [tareaParaEditar, setTareaParaEditar] = useState({});

    const listaDeTareas = useSelector((state) => state.tasks);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {listaDeTareas &&
                listaDeTareas.map((task, i) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }} key={i}>
                        <TaskGenerator task={task} />
                        <IconButton
                            color="info"
                            sx={{
                                margin: 'auto 10px',
                                height: '100%',
                            }}
                            onClick={() => {
                                setTareaParaEditar(task);
                                setEdit(!edit);
                                setShowForm(!showForm);
                            }}
                        >
                            <EditIcon sx={{ fontSize: '40px' }} />
                        </IconButton>
                        <IconButton
                            color="error"
                            sx={{
                                margin: 'auto',
                                height: '100%',
                            }}
                            // onClick={() => {
                            //     setEdit(!edit);
                            //     setShowForm(!showForm);
                            // }}
                        >
                            <DeleteIcon sx={{ fontSize: '40px' }} />
                        </IconButton>
                    </Box>
                ))}

            <Box
                sx={{
                    display: 'flex',
                    width: '50%',
                    height: '7rem',
                    margin: '15px auto',
                }}
            >
                <IconButton
                    sx={{ margin: '0px auto', height: '100%', width: '70%' }}
                    onClick={() => setShowForm(!showForm)}
                >
                    <AddIcon
                        sx={{
                            height: '100%',
                            width: '100%',
                            color: '#404040',
                            boxShadow: '0 10px 60px 0 rgba(230, 230, 230, 0.8)',

                            fontSize: '5rem',
                            border: '1px solid #404040',
                            borderRadius: '100%',
                        }}
                    />
                </IconButton>
            </Box>

            <Form
                show={showForm}
                setShow={setShowForm}
                setEdit={setEdit}
                task={tareaParaEditar}
                type={(edit && 'editTask') || 'createTask'}
            />
        </Box>
    );
};

export default Task;
