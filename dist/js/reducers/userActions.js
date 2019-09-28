"use strict";

var player = function player() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LEFT;
    var action = arguments[1];

    switch (action.type) {
        case SWIPELEFT:
            return Object.assign(state, { direction: LEFT });
        case SWIPERIGHT:
            return Object.assign(state, { direction: RIGHT });
        case SWIPEUP:
            return Object.assign(state, { direction: UP });
        case SWIPEDOWN:
            return Object.assign(state, { direction: DOWN });
        default:
            return state;
    }
};