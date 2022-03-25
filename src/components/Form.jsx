import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updater } from '../helpers/requests.js';
import { fechaActual } from '../helpers/auxileFunctions';

const RegisterDialogForm = ({ show, setShow, setEdit, type, task }) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        task: '',
        expireAt: '',
        createAt: '',
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        setFormValues({ ...formValues, [name]: e.target.value });
        console.log(formValues);
    };

    useEffect(() => {
        setFormValues({
            task: type === 'editTask' ? task.task : '',
            expireAt: type === 'editTask' ? task.expireAt : fechaActual(),
            createAt: type === 'editTask' ? task.createAt : '',
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
                                defaultValue={formValues.expireAt}
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
                                onClick={() => {
                                    setFormValues({ ...formValues, ['createAt']: fechaActual() });
                                    //dispatch con la info

                                    updater(dispatch, formValues);

                                    // reseteo el form
                                    setShow(false);
                                    type === 'editTask' && setTimeout(() => setEdit(false), 500);
                                }}
                            >
                                {type === 'editTask' ? 'Editar Tarea' : 'Crear Tarea'}
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
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

export default RegisterDialogForm;
