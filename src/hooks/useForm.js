import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updater, create } from '../helpers/requests.js';
import { fechaActual, uniqueId } from '../helpers/auxileFunctions';

const useForm = (show, setShow, setEdit, type, task) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        id: '',
        task: '',
        expireAt: '',
        createAt: '',
        completed: false,
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        setFormValues({ ...formValues, [name]: e.target.value });
    };

    const handleSubmit = () => {
        if (task.id) {
            updater(dispatch, formValues);
            setTimeout(() => setEdit(false), 500);
        } else {
            const date = fechaActual();
            create(dispatch, formValues, date);
        }
        setShow(false);
    };

    useEffect(() => {
        setFormValues({
            id: type === 'editTask' ? task.id : uniqueId(),
            task: type === 'editTask' ? task.task : '',
            expireAt: type === 'editTask' ? task.expireAt : fechaActual(),
            createAt: type === 'editTask' ? task.createAt : '',
            completed: task.completed || false,
        });
    }, [show]);

    return { formValues, setFormValues, handleInputChange, handleSubmit };
};

export default useForm;
