const initHunter = {
    x: 7,
    y: 7,
    path: [],
    history: [],
    currentStep: null
};

const hunterReducer = (state = initHunter, action) => {
    switch(action.type) {
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
        case REVERSE_HISTORY:
            return {
                ...state,
                history: state.history.reverse()
            }
        case SET_POSITION_FROM_HISTORY:
            return {
                ...state,
                x: state.history[action.index].x,
                y: state.history[action.index].y
            }
        case SET_HUNTER_POSITION: {
            let {x, y} = state;

            switch(state.currentStep) {
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
                x,
                y
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
        default:
            return state;
    }
}