import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTasks = createAction('GET_TASKS');
export const setTasks = createAction('SET_TASKS');

// export const usertunk = createAsyncThunk('AUTO_LOGIN', () => {
//     return axios.get('/api/user/me').then(({ data }) => data[0]);
// });

// export const sendLoginRequest = createAsyncThunk('LOGIN', (login) => {
//     return axios.post('/api/auth/signin', login).then((res) => {
//         if (res.status === 200) {
//             return res.data[0];
//         }
//     });
// });
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
    [getTasks]: (state, action) => action.payload,
    [setTasks]: (state, action) => action.payload,
    [sendUpdateRequest.fulfilled]: (state, action) => (state = action.payload),
    [sendDeleteRequest.fulfilled]: (state, action) => action.payload,
    [sendCreateRequest.fulfilled]: (state, action) => action.payload,
});
