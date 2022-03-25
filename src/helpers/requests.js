import axios from 'axios';

import { getTasks, sendUpdateRequest } from '../store/tasks';

export const updater = (dispatch, task) => {
    dispatch(sendUpdateRequest({ ...task, id: task.id }));
    axios.get('/tasks').then((tareas) => dispatch(getTasks(tareas.data)));
};
