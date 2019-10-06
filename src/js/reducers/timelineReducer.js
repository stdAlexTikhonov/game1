const initTimeline = { 
    direction: null,
    index: 0
};

const  timelineReducer = (state = initTimeline, action) => {
    switch (action.type) {
        case SWIPE_TIME_LEFT:
            return {
                ...state,
                direction: LEFT
            }
        case SWIPE_TIME_RIGHT:
            return {
                ...state,
                direction: RIGHT
            }
        case PAUSE_TIME:
            return {
                ...state,
                direction: null
            }
        case SET_INDEX:
            return {
                ...state,
                index: state.index + action.index
            }
        case RESET_TIMELINE:
            return initTimeline
        default:
            return state;
    }
}