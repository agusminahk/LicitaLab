import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const EditFormTask = ({ show, setShow, type }) => {
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
        const task = e.target.tarea;
        console.log(task);
        console.log(e);
        setFormValues({ ...formValues, [task]: e.target.value });
    };
    return (
        <>
            <Dialog open={show} fullWidth onClose={() => setShow(false)}>
                <DialogTitle sx={{ margin: '10px auto' }}>
                    {type === 'createTask' ? 'Agregar Tarea ' : 'Editar Tarea'}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={4} sx={{ padding: '10px ' }}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Tarea"
                                    type="text"
                                    placeholder="Lavar el auto"
                                    fullWidth
                                    name="tarea"
                                    value={formValues.name}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label="Dia"
                                    type="datetime-local"
                                    name="Dia"
                                    // defaultValue={formValues.expireAt}
                                    fullWidth
                                    value={formValues.expireAt}
                                    onChange={(e) => console.log(e.target.value)}
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
                                    onClick={() => setShow(false)}
                                >
                                    Crear Tarea
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => setShow(false)}
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

export default EditFormTask;
