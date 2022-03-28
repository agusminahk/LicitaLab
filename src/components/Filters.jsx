import React, { useState } from 'react';
import { Box, TextField, Typography, Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import { refresh } from '../helpers/requests';

const Filters = () => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        content: '',
        hasta: '',
        desde: '',
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        setFormValues({ ...formValues, [name]: e.target.value });
    };

    const handleSearch = async () => {
        const tareas = await axios.get(`/tasks?task_like=${formValues.content}`);
        await refresh(dispatch, tareas);
    };

    const handleClearFilter = async () => {
        await refresh(dispatch);
        setFormValues({
            content: '',
            hasta: '',
            desde: '',
        });
    };

    return (
        <>
            <Accordion sx={{ width: '80%' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">FILTROS</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: '95%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <TextField
                                id="outlined-basic"
                                label="Palabra o Frase"
                                name="content"
                                variant="outlined"
                                value={formValues.content}
                                onChange={handleInputChange}
                                sx={{ width: '80%', margin: '0 auto' }}
                            />

                            {/* <TextField
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: '#fff', color: '#fff' }}
                                label="Desde"
                                type="datetime-local"
                                name="desde"
                                value={formValues.desde}
                                onChange={handleInputChange}
                            />
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: '#fff', color: '#fff' }}
                                label="Hasta"
                                type="datetime-local"
                                name="hasta"
                                value={formValues.hasta}
                                onChange={handleInputChange}
                            /> */}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '30px' }}>
                            <Button
                                startIcon={<SearchIcon />}
                                size="large"
                                variant="contained"
                                color="success"
                                onClick={handleSearch}
                            >
                                Buscar
                            </Button>
                            <Button
                                startIcon={<ClearAllIcon />}
                                size="large"
                                variant="contained"
                                color="info"
                                onClick={handleClearFilter}
                            >
                                Limpiar Filtros
                            </Button>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Filters;
