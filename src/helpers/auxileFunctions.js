import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export function fechaActual() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
}

export function uniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function taskStatus(expire, status) {
    const tresHoras = 3600000 * 3;
    const result = +new Date(expire) - Date.now();

    if (status)
        return { color: 'rgba(142, 236, 245, .33)', icon: BookmarkAddedIcon, iconColor: 'rgba(144, 219, 244,1)' };
    if (result < 0)
        return { color: 'rgba(255, 173, 173, .33)', icon: RemoveCircleIcon, iconColor: 'rgba(255, 173, 173, 1)' };
    if (result > 0 && result < tresHoras)
        return { color: 'rgba(202, 255, 191, .33)', icon: CheckCircleIcon, iconColor: 'rgba(170, 246, 131, 1)' };

    return { color: 'rgba(253, 255, 182, .33)', icon: AccessTimeFilledIcon, iconColor: 'rgba(255, 214, 165, 1)' };
}
