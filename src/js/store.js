const createStore = reducer => {
    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter(item => item !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
};

const store = createStore(app);

store.subscribe(() => {
    console.log('The new state is: ', store.getState())
});
