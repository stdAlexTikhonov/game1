"use strict";

var createStore = function createStore(reducer) {
  var state;
  var listeners = [];

  var getState = function getState() {
    return state;
  };

  var subscribe = function subscribe(listener) {
    listeners.push(listener);
    return function () {
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var dispatch = function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(function (listener) {
      return listener();
    });
  };

  return {
    getState: getState,
    subscribe: subscribe,
    dispatch: dispatch
  };
};

var store = createStore(app); // store.subscribe(() => {
//     console.log('The new state is: ', store.getState().player)
// });