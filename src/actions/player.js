export const RECEIVE_PLAYER = "RECEIVE_PLAYER";
export const SWIPEUP = 'SWIPEUP';
export const SWIPEDOWN = 'SWIPEDOWN';
export const SWIPELEFT = 'SWIPELEFT';
export const SWIPERIGHT = 'SWIPERIGHT';
export const SET_PLAYER_DIRECTION = 'SET_PLAYER_DIRECTION';
export const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';
export const SET_CALCULATED_PLAYER_POSITION = 'SET_CALCULATED_PLAYER_POSITION';
export const RESET_DIRECTION = 'RESET_DIRECTION';
export const TURBOBOOST = 'TURBOBOOST';
export const SLOWDOWN = 'SLOWDOWN';
export const STOP_KILLER = 'STOP_KILLER';
export const SAVE = 'SAVE';

export function receivePlayer(player) {
    return {
        type: RECEIVE_PLAYER,
        player
    }
}

export function swipeUp() {
    return {
        type: SWIPEUP
    }
}

export function swipeDown() {
    return {
        type: SWIPEDOWN,
    }
}

export function swipeLeft() {
    return {
        type: SWIPELEFT,
    }
}

export function swipeRight() {
    return {
        type: SWIPERIGHT,
    }
}

export function setPlayerDirection() {
    return {
        type: SET_PLAYER_DIRECTION,
    }
}

export function setPlayerPosition(map_) {
    return {
        type: SET_PLAYER_POSITION,
        map_
    }
}

export function setCalculatedPlayerPosition(x,y) {
    return {
        type: SET_CALCULATED_PLAYER_POSITION,
        x,
        y
    }
}

export function resetDirection() {
    return {
        type: RESET_DIRECTION,
    }
}

export function turboBoost() {
    return {
        type: TURBOBOOST,
    }
}

export function slowDown() {
    return {
        type: SLOWDOWN,
    }
}

export function stopKiller() {
    return {
        type: STOP_KILLER,
    }
}