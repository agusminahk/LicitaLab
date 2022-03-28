import axios from 'axios';

import { orderByDefault, orderByExpire, orderByImportance } from './orderFunctions';
import { sendUpdateToRelease } from '../store/releaseTasks';
import { setTasks, sendUpdateRequest, sendDeleteRequest, sendCreateRequest } from '../store/tasks';

// refrescamos nuestra lista de tareas y aplicamos el orden
export const refresh = async (dispatch, tareas) => {
    const result = tareas || (await axios.get('/tasks'));

    const order = window.localStorage.getItem('order');

    if (order === 'default') {
        const tareasOrdenadasByDefault = orderByDefault(result.data);
        return await dispatch(setTasks(tareasOrdenadasByDefault));
    }

    if (order === 'expire') {
        const tareasOrdenadasByExpire = orderByExpire(result.data);
        return await dispatch(setTasks(tareasOrdenadasByExpire));
    }

    if (order === 'importance') {
        const tareasOrdenadasByImportance = orderByImportance(result.data);
        return dispatch(setTasks(tareasOrdenadasByImportance));
    }

    return dispatch(setTasks([]));
};

// Pedido para actualizar una tarea
export const updater = async (dispatch, task) => {
    await dispatch(sendUpdateRequest({ ...task, id: task.id }));
    await refresh(dispatch);
    return;
};

// Pedido para crear una tarea
export const create = async (dispatch, task, date) => {
    await dispatch(sendCreateRequest({ ...task, id: task.id, createAt: date }));
    await refresh(dispatch);
    return;
};

// Pedido para eliminar una tarea
export const toTrash = async (dispatch, id) => {
    await dispatch(sendDeleteRequest(id));
    await refresh(dispatch);
    return;
};

// Pedido para liberar una tarea
export const changeTaskStatus = async (dispatch, tasks) => {
    await dispatch(sendUpdateToRelease(tasks));
    await refresh(dispatch);
    return;
};
