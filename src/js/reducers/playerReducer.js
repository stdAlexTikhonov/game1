const initPlayer = { 
    x: 1, 
    y: 1, 
    direction: null, 
    lastUserDirection: null,
    previousDirection: null,
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
                    if (MAP_[state.y+1][state.x-1] === 1 && MAP_[state.y][state.x-1] === 0) {
                        y += 1;
                    } else if (MAP_[state.y-1][state.x-1] === 1 && MAP_[state.y][state.x-1] === 0) {
                        y -= 1;
                    } else {
                        x -= 1;
                    }
                    break;
                case RIGHT:
                    x += 1;
                    break;
                case UP:
                    y -= 1;
                    break;
                case DOWN:
                    if (MAP_[state.y+1][state.x+1] === 1 && MAP_[state.y+1][state.x] === 0) {
                        x += 1;
                    } else if (MAP_[state.y+1][state.x-1] === 1 && MAP_[state.y+1][state.x] === 0) {
                        x -= 1;
                    } else {
                        y += 1
                    }
                    break;
            }

    
            return {
                ...state,
                previousDirection: state.direction,
                direction: lastUserDirection,
                points: state.direction && !state.foodMap.includes(`${y + '' + x}`) ? state.points + 1 : state.points,
                foodMap: state.foodMap.includes(`${y + '' + x}`) ? state.foodMap : state.foodMap.concat([`${y + '' + x}`]),
                x,
                y,

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