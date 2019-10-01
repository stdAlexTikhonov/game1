const initTimeline = { 
    x: WINDOW_WIDTH - TIME_STEP, 
    direction: null,
    index: 10,
    timemashine: false
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
        case PAUSE:
            return {
                ...state,
                direction: null
            }
        default:
            return state;
    }
}