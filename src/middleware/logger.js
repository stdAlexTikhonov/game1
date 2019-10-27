const stopList = ['SET_TIMER', 'SET_PLAYER_POSITION', 'SET_PLAYER_DIRECTION'];
const logger = (store) => (next) => (action) => {
    if (!stopList.includes(action.type)) {
        console.group(action.type);
        console.log('The action: ', action);
        const returnValue = next(action);
        console.log("The new state", store.getState())
        console.groupEnd();
        return returnValue;
    }
    
}

export default logger;