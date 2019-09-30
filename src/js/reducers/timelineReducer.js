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
        case SET_TIME_POSITION: {
            let {x, direction} = state;
            switch(direction) {
                case LEFT:
                    x -= x > 0 ? TIME_STEP : 0;
                    break;
                case RIGHT:
                    x += x < WINDOW_WIDTH ? TIME_STEP : 0;
                    break;  
            }
            return {
                ...state,
                x,
                index: Math.floor(x/WINDOW_WIDTH*10),
                timemashine: true
            }
        }
        default:
            return {
                ...state,
                timemashine: false
            };
    }
}