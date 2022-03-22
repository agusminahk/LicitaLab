import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice.js';

export const store = configureStore({
    middleware: (mw) => mw().concat(logger),
    reducer: {
        tasks: tasksSlice,
    },
});
