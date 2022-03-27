import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FilterListIcon from '@mui/icons-material/FilterList';
import UpdateIcon from '@mui/icons-material/Update';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

import { setTasks } from '../store/tasks.js';
import { orderByExpire, orderByImportance, orderByDefault } from '../helpers/orderFunctions.js';

const TasksOrderButton = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const tasks = useSelector(({ tasks }) => tasks);

    const order = window.localStorage.getItem('order');

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOrder = (orderFunction) => {
        const tareasOrdenadas = orderFunction(tasks);
        dispatch(setTasks(tareasOrdenadas));
        handleClose();
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<FilterListIcon />}
            >
                Order
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    disableRipple
                    onClick={() => handleOrder(orderByDefault)}
                    sx={{
                        backgroundColor: order === 'default' && 'rgba(0,0,0, .1)',
                        '&:hover': { backgroundColor: order === 'default' && 'rgba(0,0,0, .1)' },
                    }}
                >
                    <EventNoteIcon sx={{ margin: '0px 5px' }} />
                    Fecha Creación
                </MenuItem>
                <MenuItem
                    disableRipple
                    onClick={() => handleOrder(orderByExpire)}
                    sx={{
                        backgroundColor: order === 'expire' && 'rgba(0,0,0, .1)',
                        '&:hover': { backgroundColor: order === 'expire' && 'rgba(0,0,0, .1)' },
                    }}
                >
                    <UpdateIcon sx={{ margin: '0px 5px' }} />
                    Fecha Vencimiento
                </MenuItem>
                <MenuItem
                    disableRipple
                    onClick={() => handleOrder(orderByImportance)}
                    sx={{
                        backgroundColor: order === 'importance' && 'rgba(0,0,0, .1)',
                        '&:hover': { backgroundColor: order === 'importance' && 'rgba(0,0,0, .1)' },
                    }}
                >
                    <ReportGmailerrorredIcon sx={{ margin: '0px 5px' }} />
                    Importancia
                </MenuItem>
            </Menu>
        </div>
    );
};

export default TasksOrderButton;
