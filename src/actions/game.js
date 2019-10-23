export const RECEIVE_GAME_DATA = "RECEIVE_GAME_DATA";
export const SAVE = 'SAVE';
export const START = 'START';
export const RESET = 'RESET';
export const STOP = 'STOP';
export const SET_TIMER = 'SET_TIMER';
export const PAUSE = 'PAUSE';
export const SWIPE_TIME_LEFT = 'SWIPE_TIME_LEFT';
export const SWIPE_TIME_RIGHT = 'SWIPE_TIME_RIGHT';
export const PAUSE_TIME = 'PAUSE_TIME';
export const SET_INDEX = 'SET_INDEX';
export const RESET_TIMELINE = 'RESRT_TIMELINE';

export function receiveGameData(game) {
    return {
        type: RECEIVE_GAME_DATA,
        game
    }
}

export function save(game) {
    return {
        type: SAVE,
        game
    }
}

export function start(game) {
    return {
        type: START,
        game
    }
}

export function reset(game) {
    return {
        type: RESET,
        game
    }
}

export function stop(game) {
    return {
        type: STOP,
        game
    }
}

export function setTimer(game) {
    return {
        type: SET_TIMER,
        game
    }
}

export function pause(game) {
    return {
        type: PAUSE,
        game
    }
}