import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FilterListIcon from '@mui/icons-material/FilterList';

import { setTasks } from '../store/tasks.js';

export default function BasicMenu() {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const tasks = useSelector(({ tasks }) => tasks);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                    onClick={() => {
                        dispatch(
                            setTasks([
                                {
                                    id: 'l17yejd105eu7c5evp6v',
                                    task: 'tarea vencida',
                                    createAt: '2022-03-26T11:34',
                                    expireAt: '2022-03-01T11:34',
                                    completed: false,
                                },
                            ])
                        );
                        handleClose();
                    }}
                >
                    <EventNoteIcon sx={{ margin: '0px 5px' }} />
                    Fecha Vencimiento
                </MenuItem>
                <MenuItem disableRipple onClick={handleClose}>
                    <WorkspacesIcon sx={{ margin: '0px 5px' }} />
                    Grupo de Colores
                </MenuItem>
            </Menu>
        </div>
    );
}
