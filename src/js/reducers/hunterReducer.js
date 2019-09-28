const hunterReducer = (state = { x: 7, y: 7, path: [], history: [], currentStep: null}, action) => {
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
        case SAVE: {
            let { history } = state;
            history = history.length > 10 ?  history.slice(1,10) : history;
            return {
                ...state,
                history: history.concat([{x: state.x, y: state.y}])
            }
        }
        default:
            return state;
    }
}