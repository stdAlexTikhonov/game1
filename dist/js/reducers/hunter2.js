"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initHunter = {
  x: 7,
  y: 7,
  path: [],
  history: [],
  currentStep: null,
  passedCells: []
};

var hunter2 = function hunter2() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initHunter;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_PATH:
      return _objectSpread({}, state, {
        path: action.path
      });

    case SET_HUNTER_DIRECTION:
      return _objectSpread({}, state, {
        currentStep: state.path.shift()
      });

    case SET_HUNTER_POSITION_FROM_HISTORY:
      return _objectSpread({}, state, {
        x: action.x,
        y: action.y
      });

    case SET_HUNTER_POSITION:
      {
        var x = state.x,
            y = state.y,
            currentStep = state.currentStep;

        var _ref = currentStep ? setHunterPosition(x, y, currentStep) : {
          x: x,
          y: y
        },
            xnew = _ref.x,
            ynew = _ref.y;

        return _objectSpread({}, state, {
          x: xnew,
          y: ynew,
          passedCells: state.passedCells.includes("".concat(ynew + '' + xnew)) ? state.passedCells : state.passedCells.concat(["".concat(ynew + '' + xnew)])
        });
      }

    case SAVE_HUNTER:
      {
        var history = state.history;
        history.unshift({
          x: action.x,
          y: action.y
        });
        return _objectSpread({}, state, {
          history: history.slice(0, HISTORY_LENGTH)
        });
      }

    default:
      return state;
  }
};