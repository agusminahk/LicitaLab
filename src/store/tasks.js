import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const setTasks = createAction('SET_TASKS');

export const sendCreateRequest = createAsyncThunk('POST', ({ task, expireAt, createAt, completed, status, id }) => {
    return axios.post(`/tasks`, { id, task, createAt, expireAt, completed }).then((res) => {
        if (res.status === 200) {
            return res.data;
        }
    });
});

export const sendUpdateRequest = createAsyncThunk('UPDATE', ({ task, expireAt, createAt, completed, id }) => {
    return axios.put(`/tasks/${id}`, { task, createAt, expireAt, completed }).then((res) => {
        if (res.status === 200) {
            return res.data[0];
        }
    });
});

export const sendDeleteRequest = createAsyncThunk('DELETE', (id) => axios.delete(`/tasks/${id}`));

export const tasksReducer = createReducer([], {
    [setTasks]: (state, action) => action.payload,
    [sendUpdateRequest.fulfilled]: (state, action) => (state = action.payload),
    [sendDeleteRequest.fulfilled]: (state, action) => action.payload,
    [sendCreateRequest.fulfilled]: (state, action) => action.payload,
});
