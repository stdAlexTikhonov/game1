const initPlayer = { 
    x: 1, 
    y: 1, 
    direction: null, 
    lastUserDirection: null,
    points: 0,
    foodMap: ['11']
};

const  playerReducer = (state = initPlayer, action) => {
    switch (action.type) {
        case SWIPELEFT:
            return {
                ...state,
                lastUserDirection: LEFT
            }
        case SWIPERIGHT:
            return {
                ...state,
                lastUserDirection: RIGHT
            }
        case SWIPEUP:
            return {
                ...state,
                lastUserDirection: UP
            }
        case SWIPEDOWN:
            return {
                ...state,
                lastUserDirection: DOWN
            }
        case SET_DIRECTION: {
            let {x, y, lastUserDirection} = state;
            switch(state.direction) {
                case LEFT:
                    x -= 1;
                    break;
                case RIGHT:
                    x += 1;
                    break;
                case UP:
                    y -= 1;
                    break;
                case DOWN:
                    y += 1;
                    break;
            }

    
            return {
                ...state,
                direction: lastUserDirection,
                points: state.direction && !state.foodMap.includes(`${y + '' + x}`) ? state.points + 1 : state.points,
                foodMap: state.foodMap.includes(`${y + '' + x}`) ? state.foodMap : state.foodMap.concat([`${y + '' + x}`]),
                x,
                y
            }
        }
        case RESET_DIRECTION:
            return {
                ...state,
                direction: null,
                lastUserDirection: null
            }
        default:
            return state;
    }
}