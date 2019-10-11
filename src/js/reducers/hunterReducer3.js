const initHunter3 = {
    x: 9,
    y: 8,
    path: [],
    history: [],
    currentStep: null,
    passedCells: []
};

const hunterReducer3 = (state = initHunter3, action) => {
    switch(action.type) {
        case SET_PATH3:
            return {
                ...state,
                path: action.path
            }
        case SET_HUNTER_DIRECTION3: 
            return {
                ...state,
                currentStep: state.path.shift() 
            }
        case SET_HUNTER_POSITION_FROM_HISTORY3: 
            return {
                ...state,
                x: action.x,
                y: action.y
            }
        case SET_HUNTER_POSITION3: {
            let {x, y, currentStep} = state;
            const { x: xnew, y: ynew } = currentStep ? setHunterPosition(x,y,currentStep) : {x, y};
            
            return {
                ...state,
                x: xnew,
                y: ynew,
                passedCells: state.passedCells.includes(`${ynew + '' + xnew}`) ? state.passedCells : state.passedCells.concat([`${ynew + '' + xnew}`]),
            }
        }
        case SAVE_HUNTER3: {
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