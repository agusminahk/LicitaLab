import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasks.js';
import { releaseTasksReducer } from './releaseTasks.js';

export const store = configureStore({
    middleware: (mw) => mw().concat(logger),
    reducer: {
        tasks: tasksReducer,
        releaseTasks: releaseTasksReducer,
    },
});
