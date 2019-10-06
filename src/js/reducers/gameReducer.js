const initGame = {
    pause: false,
    process: false,
    timer: 0,
    savedTimerPosition: null
};

const gameReducer = (state = initGame, action) => {
    switch (action.type) {
        case START:
            return {
                ...state,
                process: true,
                pause: false,
                savedTimerPosition: null
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
                pause: true,
                savedTimerPosition: state.timer
            }
        default:
            return state;
    }
}