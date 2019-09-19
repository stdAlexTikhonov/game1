const  reducer1 = (state = [], action) => {
    switch (action.type) {
        case 'ACTION1':
            return state.concat([action.payload]);
        default:
            return state;
    }
}

const  reducer2 = (state = false, action) => {
    switch (action.type) {
        case 'ACTION2':
            return !state;
        default:
            return state;
    }
}

const app = (state = {}, action) => {
    return {
        reducer1: reducer1(state.reducer1, action),
        reducer2: reducer2(state.reducer2, action)
    }
}