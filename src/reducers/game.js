import { RECEIVE_GAME_DATA } from '../actions/game';

export default function game (state = {}, action) {
    switch (action.type) {
        case RECEIVE_GAME_DATA:
            return {
                ...state,
                ...action.game
            }
            case START:
                return {
                    ...state,
                    process: true,
                    pause: false
                }
            case STOP:
                return {
                    ...state,
                    process: false
                }
            case SET_TIMER:
                return {
                    ...state,
                    timer: (state.timer + STEP) % CELL_WIDTH
                }
            case PAUSE: 
                return {
                    ...state,
                    pause: true
                }
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
                    index: action.index
                }
            case RESET_TIMELINE:
                return {
                    ...state,
                    direction: null,
                    index: 0
                }
        default:
            return state;
    }
}