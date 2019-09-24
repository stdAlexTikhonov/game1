const gameReducer = (state = { history: [], process: false, timer: 0}, action) => {
    switch (action.type) {
        case SAVE:
            return Object.assign(state, { history: state.history.concat([action.payload])});
        case START: 
            return Object.assign(state, { 'process': true})
        case STOP:
            return Object.assign(state, { 'process': false})
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