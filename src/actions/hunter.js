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

export function setPath(index,path) {
    return {
        type: SET_PATH,
        path,
        index
    }
}

export function setHunterDirection(index) {
    return {
        type: SET_HUNTER_DIRECTION,
        index
    }
}

export function setHunterPosition(index) {
    return {
        type: SET_HUNTER_POSITION,
        index
    }
}

export function setHunterPositionFromHistory(x,y, index) {
    return {
        type: SET_HUNTER_POSITION_FROM_HISTORY,
        x,
        y,
        index
    }
}

export function saveHunter(x,y, index) {
    return {
        type: SAVE_HUNTER,
        x,
        y,
        index
    }
}

export function killHunter(index) {
    return {
        type: KILL_HUNTER,
        index
    }
}