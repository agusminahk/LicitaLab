import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const RegisterDialogForm = ({ show, setShow, setEdit, type }) => {
    console.log(type);
    const [formValues, setFormValues] = useState({
        task: '',
        expireAt: fechaActual(),
        createAt: '',
    });

    function fechaActual() {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    };
    const handleInputChange = (e) => {
        const name = e.target.name;
        setFormValues({ ...formValues, [name]: e.target.value });
    };

    return (
        <>
            <Dialog open={show} fullWidth onClose={() => setShow(false)}>
                <DialogTitle sx={{ margin: '10px auto' }}>
                    {type === 'createTask' ? 'Agregar Tarea ' : 'Editar Tarea'}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
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

                                        // reseteo el form
                                        setShow(false);
                                    }}
                                >
                                    Crear Tarea
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setShow(false);
                                        type === 'editTask' && setEdit(false);
                                    }}
                                    disableElevation
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default RegisterDialogForm;
