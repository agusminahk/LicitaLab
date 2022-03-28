import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const setReleasedTask = createAction('SET_RELEASED_TASK');

export const sendUpdateToRelease = createAsyncThunk('UPDATE', async (tasks) => {
    const promises = [];
    tasks.forEach(({ id, task, createAt, expireAt, completed }) => {
        promises.push(axios.put(`/tasks/${id}`, { task, createAt, expireAt, completed: !completed }));
    });

    // Completamos todas los pedidos a liberar
    await Promise.all(promises);

    return [];
});

export const releaseTasksReducer = createReducer([], {
    [setReleasedTask]: (state, action) => action.payload,
    [sendUpdateToRelease]: (state, action) => (state = action.payload),
});
