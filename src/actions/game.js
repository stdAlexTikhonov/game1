export const RECEIVE_GAME_DATA = "RECEIVE_GAME_DATA";
export const SAVE = 'SAVE';
export const START = 'START';
export const STOP = 'STOP';
export const SET_TIMER = 'SET_TIMER';
export const PAUSE = 'PAUSE';
export const SET_INDEX = 'SET_INDEX';
export const RESET_TIMELINE = 'RESRT_TIMELINE';
export const SET_MAP = 'SET_MAP';
export const SET_MAP_POSITION = 'SET_MAP_POSITION';

export function receiveGameData(game) {
    return {
        type: RECEIVE_GAME_DATA,
        game
    }
}

export function save(x,y) {
    return {
        type: SAVE,
        x,
        y
    }
}

export function start() {
    return {
        type: START,
    }
}

export function stop() {
    return {
        type: STOP,
    }
}

export function setTimer() {
    return {
        type: SET_TIMER,
    }
}

export function pause() {
    return {
        type: PAUSE,
    }
}

export function setIndex(index) {
    return {
        type: SET_INDEX,
        index
    }
}

export function resetTimeline() {
    return {
        type: RESET_TIMELINE,
    }
}

export function setMap(index) {
    return {
        type: SET_MAP,
        index
    }
}

export function setMapPosition(X,Y) {
    return {
        type: SET_MAP_POSITION,
        X,
        Y
    }
}