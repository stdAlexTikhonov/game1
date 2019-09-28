'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var reducer1 = exports.reducer1 = function reducer1() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case 'ACTION1':
            return state.concat([action.letter]);
        default:
            return state;
    }
};