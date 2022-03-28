import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Switch,
    FormGroup,
    FormControlLabel,
} from '@mui/material';
import React from 'react';

import useForm from '../hooks/useForm';

const Form = ({ show, setShow, setEdit, type, task }) => {
    const { formValues, setFormValues, handleInputChange, handleSubmit } = useForm(show, setShow, setEdit, type, task);

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

                        {/* SI LIBERARON POR ERROR UNA TAREA, DESDE LA OPCION DE EDITAR PODRAN VOLVER ATRAS */}

                        {type === 'editTask' && (
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                defaultChecked={task.completed}
                                                onChange={(e) => {
                                                    setFormValues({ ...formValues, ['completed']: e.target.checked });
                                                }}
                                            />
                                        }
                                        label="Tarea Completada"
                                    />
                                </FormGroup>
                            </Grid>
                        )}

                        {/*  */}

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
                                    type === 'editTask' && setTimeout(() => setEdit(false), 300);
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
