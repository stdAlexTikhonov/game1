const createStore = reducer => {
    let state;
    let listeners = [];
    let prevAction = null;

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter(item => item !== listener)
        }
    }

    const dispatch = (action) => {
        if (prevAction == action.type) { 
            const timrId = setTimeout(() => { prevAction = null; clearTimeout(timrId); }, 3000);
            return
        };

        state = reducer(state, action)
        listeners.forEach(listener => listener())

        prevAction = action.type;

    }

    return {
        getState,
        subscribe,
        dispatch
    }
};

const store = createStore(app);

// store.subscribe(() => {
//     console.log('The new state is: ', store.getState())
// });
