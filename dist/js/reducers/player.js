"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initPlayer = {
  x: 1,
  y: 1,
  direction: null,
  lastUserDirection: null
};

var player = function player() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initPlayer;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SWIPELEFT:
      return _objectSpread({}, state, {
        lastUserDirection: LEFT
      });

    case SWIPERIGHT:
      return _objectSpread({}, state, {
        lastUserDirection: RIGHT
      });

    case SWIPEUP:
      return _objectSpread({}, state, {
        lastUserDirection: UP
      });

    case SWIPEDOWN:
      return _objectSpread({}, state, {
        lastUserDirection: DOWN
      });

    case SET_DIRECTION:
      {
        var x = state.x,
            y = state.y,
            lastUserDirection = state.lastUserDirection;

        switch (state.direction) {
          case LEFT:
            x -= 1;
            break;

          case RIGHT:
            x += 1;
            break;

          case UP:
            y -= 1;
            break;

          case DOWN:
            y += 1;
            break;
        }

        return _objectSpread({}, state, {
          direction: lastUserDirection,
          x: x,
          y: y
        });
      }

    case RESET_DIRECTION:
      return _objectSpread({}, state, {
        direction: null,
        lastUserDirection: null
      });

    default:
      return state;
  }
};