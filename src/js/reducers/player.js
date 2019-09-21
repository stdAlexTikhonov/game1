const initPlayer = { 
    x: 1, 
    y: 1, 
    direction: null, 
    lastUserDirection: null,
    timer: 0 
};

const  player = (state = initPlayer, action) => {
    switch (action.type) {
        case SWIPELEFT:
            return {
                ...state,
                lastUserDirection: LEFT
            }
        case SWIPERIGHT:
            return {
                ...state,
                lastUserDirection: RIGHT
            }
        case SWIPEUP:
            return {
                ...state,
                lastUserDirection: UP
            }
        case SWIPEDOWN:
            return {
                ...state,
                lastUserDirection: DOWN
            }
        case SET_DIRECTION:
            return {
                ...state,
                direction: state.lastUserDirection
            }
        case SET_PLAYER_Y:
            return {
                ...state,
                y: action.position
            }
        case SET_PLAYER_X:
            return {
                ...state,
                x: action.position
            }
        case SET_TIMER:
            return {
                ...state,
                timer: (state.timer + STEP) % CELL_WIDTH
            }
        case RESET_DIRECTION:
            return {
                ...state,
                direction: null,
                lastUserDirection: null
            }
        default:
            return state;
    }
}