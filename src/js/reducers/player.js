const  player = (state = { x: 0, y: 0, direction: LEFT }, action) => {
    switch (action.type) {
        case SWIPELEFT:
            return {
                ...state,
                direction: LEFT
            }
        case SWIPERIGHT:
            return {
                ...state,
                direction: RIGHT
            }
        case SWIPEUP:
            return {
                ...state,
                direction: UP
            }
        case SWIPEDOWN:
            return {
                ...state,
                direction: DOWN
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
        default:
            return state;
    }
}