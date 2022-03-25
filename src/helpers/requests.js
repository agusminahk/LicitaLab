import axios from 'axios';

import { getTasks, sendUpdateRequest, sendDeleteRequest, sendCreateRequest } from '../store/tasks';

const refresh = async (dispatch) => {
    const result = await axios.get('/tasks');
    await dispatch(getTasks(result.data));
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
