import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTasks = createAction('GET_TASKS');

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
export const sendUpdateRequest = createAsyncThunk('UPDATE', ({ task, expireAt, createAt, status, id }) => {
    return axios.put(`/tasks/${id}`, { task, createAt, expireAt }).then((res) => {
        if (res.status === 200) {
            return res.data[0];
        }
    });
});

export const tasksReducer = createReducer([], {
    [getTasks]: (state, action) => action.payload,
    [sendUpdateRequest.fulfilled]: (state, action) => (state = action.payload),
});
