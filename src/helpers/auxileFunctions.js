export function fechaActual() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
}

export function uniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
