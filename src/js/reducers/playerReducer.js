const initPlayer = { 
    x: 1, 
    y: 1, 
    direction: null, 
    lastUserDirection: null,
    previousDirection: null,
    points: 0,
    turboscores: 0,
    isTurboActive: false,
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
        case SET_CALCULATED_PLAYER_POSITION: 
            return {
                ...state,
                x: action.x,
                y: action.y
            }
        case SET_PLAYER_POSITION: {
            let {x, y} = state;
            const { x: newx, y: newy} = state.direction ? setPlayerPosition() : { x, y};
            return {
                ...state,
                points: state.direction && !state.foodMap.includes(`${newy + '' + newx}`) ? state.points + 1 : state.points,
                turboscores: state.turboscores < 10 && !state.foodMap.includes(`${newy + '' + newx}`) ? state.turboscores + 1 : state.turboscores,
                foodMap: state.foodMap.includes(`${newy + '' + newx}`) ? state.foodMap : state.foodMap.concat([`${newy + '' + newx}`]),
                x: newx,
                y: newy,
            }
        }
        case SET_PLAYER_DIRECTION: {
            let {lastUserDirection} = state;
            return {
                ...state,
                previousDirection: state.direction,
                direction: lastUserDirection,
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
            history.unshift({ x: action.x, y: action.y});
            return {
                ...state,
                history: history.slice(0,HISTORY_LENGTH)
            }
        }
        default:
            return state;
    }
}