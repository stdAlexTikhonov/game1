const initGame = {
    pause: false,
    process: false,
    timer: 0,
    direction: null,
    index: 0
};

const gameReducer = (state = initGame, action) => {
    switch (action.type) {
        case START:
            return {
                ...state,
                process: true,
                pause: false
            }
        case STOP:
            return {
                ...state,
                process: false
            }
        case SET_TIMER:
            return {
                ...state,
                timer: (state.timer + STEP) % CELL_WIDTH
            }
        case PAUSE: 
            return {
                ...state,
                pause: true
            }
        case SET_INDEX:
            return {
                ...state,
                index: action.index
            }
        case RESET_TIMELINE:
            return {
                ...state,
                direction: null,
                index: 0
            }
        default:
            return state;
    }
}