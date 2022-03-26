import axios from 'axios';

import { defaultOrder, orderByExpire } from './orderFunctions';
import { setTasks, sendUpdateRequest, sendDeleteRequest, sendCreateRequest } from '../store/tasks';

const refresh = async (dispatch) => {
    const result = await axios.get('/tasks');

    const order = window.localStorage.getItem('order');

    if (order === 'default') {
        const tareasOrdenadasByDefault = defaultOrder(result.data);
        return await dispatch(setTasks(tareasOrdenadasByDefault));
    }

    if (order === 'expire') {
        const tareasOrdenadasByExpire = orderByExpire(result.data);
        return await dispatch(setTasks(tareasOrdenadasByExpire));
    }

    if (order === 'status') {
    }
};

export const updater = async (dispatch, task) => {
    await dispatch(sendUpdateRequest({ ...task, id: task.id }));
    refresh(dispatch);
};

export const create = async (dispatch, task, date) => {
    await dispatch(sendCreateRequest({ ...task, id: task.id, createAt: date }));
    refresh(dispatch);
};

export const toTrash = (dispatch, id) => {
    dispatch(sendDeleteRequest(id));
    refresh(dispatch);
};
