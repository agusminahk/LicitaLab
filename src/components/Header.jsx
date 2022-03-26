import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';

import Filters from './Filters';

const Header = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography>Cosas por Hacer</Typography>
                <Box>fecha</Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button> liberar seleccionados</Button>
                <Box sx={{ display: 'flex' }}>
                    <Filters />
                    {/* <Button startIcon={<FilterListIcon />}>Order</Button> */}
                    <Button>Filtro</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
