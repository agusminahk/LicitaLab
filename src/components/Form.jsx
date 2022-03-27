import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updater, create } from '../helpers/requests.js';
import { fechaActual, uniqueId } from '../helpers/auxileFunctions';

const Form = ({ show, setShow, setEdit, type, task }) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        id: '',
        task: '',
        expireAt: '',
        createAt: '',
        completed: false,
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        setFormValues({ ...formValues, [name]: e.target.value });
    };

    const handleSubmit = () => {
        if (task.id) {
            updater(dispatch, formValues);
            setTimeout(() => setEdit(false), 500);
        } else {
            const date = fechaActual();
            create(dispatch, formValues, date);
        }
        setShow(false);
    };

    useEffect(() => {
        setFormValues({
            id: task.id || uniqueId(),
            task: task.task || '',
            expireAt: task.expireAt || fechaActual(),
            createAt: task.createAt || '',
            completed: task.completed || false,
        });
    }, [show]);

    return (
        <>
            <Dialog
                open={show}
                fullWidth
                onClose={() => {
                    setShow(false);
                }}
                onBackdropClick={() => {
                    setShow(false);
                    task.id &&
                        setTimeout(() => {
                            setEdit(false);
                        }, 500);
                }}
                onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
            >
                <DialogTitle sx={{ margin: '10px auto' }}>
                    {type === 'editTask' ? 'Editar Tarea ' : 'Agregar Tarea'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4} sx={{ padding: '10px' }}>
                        <Grid item xs={12}>
                            <TextField
                                label="Tarea"
                                type="text"
                                placeholder="Lavar el auto"
                                fullWidth
                                name="task"
                                value={formValues.task}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="Dia"
                                type="datetime-local"
                                name="expireAt"
                                fullWidth
                                value={formValues.expireAt}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                width: '50%',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                margin: '0px auto',
                            }}
                        >
                            <Button
                                style={{ marginLeft: '15px' }}
                                variant="contained"
                                color="info"
                                type="submit"
                                disableElevation
                                onClick={() => handleSubmit()}
                            >
                                {type === 'editTask' ? 'Editar Tarea' : 'Crear Tarea'}
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                type="button"
                                onClick={() => {
                                    setShow(false);
                                    type === 'editTask' && setTimeout(() => setEdit(false), 500);
                                }}
                                disableElevation
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Form;
