import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const setTasks = createAction('SET_TASKS');

export const sendCreateRequest = createAsyncThunk('POST_TASK', async ({ task, expireAt, createAt, completed, id }) => {
    const { data } = await axios.post(`/tasks/`, { task, createAt, expireAt, completed, id });
    return data;
});

export const sendUpdateRequest = createAsyncThunk(
    'UPDATE_TASK',
    async ({ task, expireAt, createAt, completed, id }) => {
        const { data } = await axios.put(`/tasks/${id}`, { task, createAt, expireAt, completed });
        return data;
    }
);

export const sendDeleteRequest = createAsyncThunk('DELETE_TASK', async (id) => {
    const { data } = await axios.delete(`/tasks/${id}`);
    return data;
});

export const tasksReducer = createReducer([], {
    [setTasks]: (state, action) => (state = action.payload),
    [sendUpdateRequest.fulfilled]: (state, action) => (state = action.payload),
    [sendDeleteRequest.fulfilled]: (state, action) => (state = action.payload),
    [sendCreateRequest.fulfilled]: (state, action) => (state = action.payload),
});
