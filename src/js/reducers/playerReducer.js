const initPlayer = { 
    x: 1, 
    y: 1, 
    direction: null, 
    lastUserDirection: null,
    previousDirection: null,
    points: 0,
    foodMap: ['11'],
    history: []
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
        case SWIPEDOWN: {
            return {
                ...state,
                lastUserDirection: DOWN
            }
        }

        case SET_POSITION_FROM_HISTORY:
                return {
                    ...state,
                    x: state.history[action.index].x,
                    y: state.history[action.index].y
                }
        case SET_DIRECTION: {
            let {x, y, lastUserDirection} = state;
            const { x: newx, y: newy} = state.direction ? setPlayerPosition(x,y,state.direction) : { x, y};
            return {
                ...state,
                previousDirection: state.direction,
                direction: lastUserDirection,
                points: state.direction && !state.foodMap.includes(`${newy + '' + newx}`) ? state.points + 1 : state.points,
                foodMap: state.foodMap.includes(`${newy + '' + newx}`) ? state.foodMap : state.foodMap.concat([`${newy + '' + newx}`]),
                x: newx,
                y: newy,

            }
        }
        case REVERSE_HISTORY:
            return {
                ...state,
                history: state.history.reverse()
            }
        case RESET_DIRECTION:
            return {
                ...state,
                direction: null,
                lastUserDirection: null
            }
        case SAVE: {
            const { history } = state;
            history.unshift({ x: state.x, y: state.y});
            return {
                ...state,
                history: history.slice(0,HISTORY_LENGTH)
            }
        }
        default:
            return state;
    }
}