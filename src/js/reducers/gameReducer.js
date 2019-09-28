const gameReducer = (state = { history: [], process: false, timer: 0}, action) => {
    switch (action.type) {
        case START: 
            return Object.assign(state, { 'process': true});
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
        case RESET:
            return {
                history: [],
                process: false
            }
        default:
            return state;
    }
}