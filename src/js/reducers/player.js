const  player = (state = LEFT, action) => {
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
        default:
            return state;
    }
}