"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var game = function game() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    history: [],
    process: false,
    timer: 0
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SAVE:
      return Object.assign(state, {
        history: state.history.concat([action.payload])
      });

    case START:
      return Object.assign(state, {
        'process': true
      });

    case STOP:
      return Object.assign(state, {
        'process': false
      });

    case SET_TIMER:
      return _objectSpread({}, state, {
        timer: (state.timer + STEP) % CELL_WIDTH
      });

    case RESET:
      return {
        history: [],
        process: false
      };

    default:
      return state;
  }
};