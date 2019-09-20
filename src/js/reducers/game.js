const game = (state = { history: [], process: false}, action) => {
    switch (action.type) {
        case SAVE:
            return Object.assign(state, { history: state.history.concat([action.payload])});
        case START: 
            return Object.assign(state, { 'process': true})
        case STOP:
            return Object.assign(state, { 'process': false})
        case RESET:
            return {
                history: [],
                process: false
            }
        default:
            return state;
    }
}