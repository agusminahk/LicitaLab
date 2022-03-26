export const defaultOrder = (tasks) => {
    window.localStorage.setItem('order', 'default');
    return [...tasks].sort((a, b) => +new Date(a.createAt) - +new Date(b.createAt));
};

export const orderByExpire = (tareas) => {
    window.localStorage.setItem('order', 'expire');
    return [...tareas].sort((a, b) => (+new Date(b.expireAt) > +new Date(a.expireAt) ? -1 : 1));
};
