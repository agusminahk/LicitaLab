import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasksList: [],
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasksList = action.payload;
        },
    },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
