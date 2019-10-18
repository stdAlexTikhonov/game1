const initHunter2 = {
    x: 10,
    y: 7,
    path: [],
    history: [],
    currentStep: null,
    passedCells: [],
    alive: true
};

const hunterReducer2 = (state = initHunter2, action) => {
    switch(action.type) {
        case SET_PATH2:
            return {
                ...state,
                path: action.path
            }
        case SET_HUNTER_DIRECTION2: 
            return {
                ...state,
                currentStep: state.path.shift() 
            }
        case SET_HUNTER_POSITION_FROM_HISTORY2: 
            return {
                ...state,
                x: action.x,
                y: action.y
            }
        case SET_HUNTER_POSITION2: {
            let {x, y, currentStep} = state;
            const { x: xnew, y: ynew } = currentStep ? setHunterPosition(x,y,currentStep) : {x, y};
            
            return {
                ...state,
                x: xnew,
                y: ynew,
                passedCells: state.passedCells.includes(`${ynew + '' + xnew}`) ? state.passedCells : state.passedCells.concat([`${ynew + '' + xnew}`]),
            }
        }
        case SAVE_HUNTER2: {
            const { history } = state;
            history.unshift({x: action.x, y: action.y});
            return {
                ...state,
                history: history.slice(0,HISTORY_LENGTH)
            }
        }
        case KILL_HUNTER2:
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