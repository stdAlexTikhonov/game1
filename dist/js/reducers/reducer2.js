'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var reducer2 = exports.reducer2 = function reducer2() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
        case 'ACTION2':
            return !state;
        default:
            return state;
    }
};