export const orderByDefault = (tasks) => {
    window.localStorage.setItem('order', 'default');
    return [...tasks].sort((a, b) => +new Date(b.createAt) - +new Date(a.createAt));
};

export const orderByExpire = (tasks) => {
    window.localStorage.setItem('order', 'expire');
    return [...tasks].sort((a, b) => (+new Date(b.expireAt) > +new Date(a.expireAt) ? -1 : 1));
};

export const orderByImportance = (tasks) => {
    window.localStorage.setItem('order', 'importance');
    const notReleasedTasks = tasks.filter((task) => task.completed === false);
    const releasedTasks = tasks.filter((task) => task.completed);

    const orderTasks = notReleasedTasks.sort((a, b) => (+new Date(b.expireAt) > +new Date(a.expireAt) ? -1 : 1));
    return [...orderTasks, ...releasedTasks];
};
