import { 
    RECEIVE_PLAYER,
    SWIPEDOWN,
    SWIPELEFT,
    SWIPERIGHT,
    SWIPEUP,
    SET_CALCULATED_PLAYER_POSITION,
    SET_PLAYER_DIRECTION,
    SET_PLAYER_POSITION,
    RESET_DIRECTION,
    SAVE,
    TURBOBOOST,
    SLOWDOWN,
    STOP_KILLER
 } from '../actions/player'
 import { 
     HISTORY_LENGTH,
     LEFT,
     RIGHT,
     UP,
     DOWN
} from '../utils/constants'
import { setPlayerPosition } from '../utils/helpers'


export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_PLAYER:
            return {
                ...state,
                ...action.player
            }
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
                    // turboscores: state.turboscores < 10 && !state.foodMap.includes(`${newy + '' + newx}`) ? state.turboscores + 1 : state.turboscores,
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
            case TURBOBOOST:
                return {
                    ...state,
                    isTurboActive: true,
                    killer: true
                }
            case SLOWDOWN:
                return {
                    ...state,
                    isTurboActive: false
                }
            case STOP_KILLER:
                return {
                    ...state,
                    killer: false
                }
        default:
            return state;
    }
}