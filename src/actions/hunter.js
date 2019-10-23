export const RECEIVE_HUNTER = "RECEIVE_HUNTER";
export const SET_PATH = 'SET_PATH';
export const SET_HUNTER_DIRECTION = 'SET_GHOST_DIRECTION';
export const SET_HUNTER_POSITION = 'SET_HUNTER_POSITION';
export const SET_HUNTER_POSITION_FROM_HISTORY = 'SET_HUNTER_POSITION_FROM_HISTORY';
export const SAVE_HUNTER = 'SAVE_HUNTER';
export const KILL_HUNTER = 'KILL_HUNTER';

export function receiveHunter(hunter) {
    return {
        type: RECEIVE_HUNTER,
        hunter
    }
}

export function setPath(path) {
    return {
        type: SET_PATH,
        path
    }
}

export function setHunterDirection() {
    return {
        type: SET_HUNTER_DIRECTION,
    }
}

export function setHunterPosition() {
    return {
        type: SET_HUNTER_POSITION,
    }
}

export function setHunterPositionFromHistory(x,y) {
    return {
        type: SET_HUNTER_POSITION_FROM_HISTORY,
        x,
        y
    }
}

export function saveHunter(x,y) {
    return {
        type: SAVE_HUNTER,
        x,
        y
    }
}

export function killHunter() {
    return {
        type: KILL_HUNTER
    }
}