import { 
    RECEIVE_HUNTER,
    SET_PATH,
    SET_HUNTER_DIRECTION,
    SET_HUNTER_POSITION,
    SET_HUNTER_POSITION_FROM_HISTORY,
    SAVE_HUNTER,
    KILL_HUNTER
} from '../actions/hunter';
import { setHunterPosition } from '../utils/helpers'
import { HISTORY_LENGTH } from '../utils/constants'

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_HUNTER:
            return {
                ...state,
                ...action.hunter
            }
            case SET_PATH:
                return {
                    ...state,
                    path: action.path
                }
            case SET_HUNTER_DIRECTION: 
                return {
                    ...state,
                    currentStep: state.path.shift() 
                }
            case SET_HUNTER_POSITION_FROM_HISTORY: 
                return {
                    ...state,
                    x: action.x,
                    y: action.y
                }
            case SET_HUNTER_POSITION: {
                let {x, y, currentStep} = state;
                const { x: xnew, y: ynew } = currentStep ? setHunterPosition(x,y,currentStep) : {x, y};
                
                return {
                    ...state,
                    x: xnew,
                    y: ynew,
                    passedCells: state.passedCells.includes(`${ynew + '' + xnew}`) ? state.passedCells : state.passedCells.concat([`${ynew + '' + xnew}`]),
                }
            }
            case SAVE_HUNTER: {
                const { history } = state;
                history.unshift({x: action.x, y: action.y});
                return {
                    ...state,
                    history: history.slice(0,HISTORY_LENGTH)
                }
            }
            case KILL_HUNTER:
                return {
                    ...state,
                    alive: false,
                    x: -1,
                    y: -1
                }
        default:
            return state;
    }
}