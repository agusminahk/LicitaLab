import React, { useState } from 'react';
import { Box, TextField, Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import axios from 'axios';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const Filters = () => {
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
        console.log(formValues);
        const { data } = await axios.get(`/tasks?task_like=${formValues.content}&`);
        console.log(data);
    };

    return (
        <>
            <Accordion sx={{ width: '80%' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Button>FILTROS</Button>
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
                                sx={{ width: '25%' }}
                            />

                            <TextField
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
                            />
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
                            <Button startIcon={<ClearAllIcon />} size="large" variant="contained" color="info">
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
