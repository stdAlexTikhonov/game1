const gameReducer = (state = { pause: false, process: false, timer: 0}, action) => {
    switch (action.type) {
        case START: 
            return Object.assign(state, { 'process': true, pause: false});
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
                pause: !state.pause
            }
        default:
            return state;
    }
}