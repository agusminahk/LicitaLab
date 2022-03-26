export function fechaActual() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
}

export function uniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function taskStatus(expire) {
    const tresHoras = 3600000 * 3;
    const result = +new Date(expire) - Date.now();

    if (result < 0) return { status: 'expired' };
    if (result > 0 && result < tresHoras) return { status: 'now' };

    return { status: 'onTime' };
}

console.log(taskStatus('2022-03-20T16:01'));
