const  userActions = (state = LEFT, action) => {
    switch (action.type) {
        case SWIPELEFT:
            return LEFT;
        case SWIPERIGHT:
            return RIGHT;
        case SWIPEUP:
            return UP;
        case SWIPEDOWN:
            return DOWN
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
        player: { 
            direction: userActions(state.userActions, action)
        },
        reducer2: reducer2(state.reducer2, action)
    }
}