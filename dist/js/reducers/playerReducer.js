"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initPlayer = {
  x: 1,
  y: 1,
  direction: null,
  lastUserDirection: null,
  previousDirection: null,
  points: 0,
  foodMap: ['11'],
  history: []
};

var playerReducer = function playerReducer() {
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
            if (MAP_[state.y][state.x - 1] === 0) {
              if (MAP_[state.y + 1][state.x - 1] === 1) {
                y += 1;
              } else if (MAP_[state.y - 1][state.x - 1] === 1) {
                y -= 1;
              }
            } else x -= 1;

            break;

          case RIGHT:
            if (MAP_[state.y][state.x + 1] === 0) {
              if (MAP_[state.y + 1][state.x + 1] === 1) {
                y += 1;
              } else if (MAP_[state.y - 1][state.x + 1] === 1) {
                y -= 1;
              }
            } else x += 1;

            break;

          case UP:
            if (MAP_[state.y - 1][state.x] === 0) {
              if (MAP_[state.y - 1][state.x + 1] === 1) {
                x += 1;
              } else if (MAP_[state.y - 1][state.x - 1] === 1) {
                x -= 1;
              }
            } else y -= 1;

            break;

          case DOWN:
            if (MAP_[state.y + 1][state.x] === 0) {
              if (MAP_[state.y + 1][state.x + 1] === 1) {
                x += 1;
              } else if (MAP_[state.y + 1][state.x - 1] === 1) {
                x -= 1;
              }
            } else y += 1;

            break;
        }

        return _objectSpread({}, state, {
          previousDirection: state.direction,
          direction: lastUserDirection,
          points: state.direction && !state.foodMap.includes("".concat(y + '' + x)) ? state.points + 1 : state.points,
          foodMap: state.foodMap.includes("".concat(y + '' + x)) ? state.foodMap : state.foodMap.concat(["".concat(y + '' + x)]),
          x: x,
          y: y
        });
      }

    case RESET_DIRECTION:
      return _objectSpread({}, state, {
        direction: null,
        lastUserDirection: null
      });

    case SAVE:
      {
        var history = state.history;
        history = history.length > 10 ? history.slice(1, 10) : history;
        return _objectSpread({}, state, {
          history: history.concat([{
            x: state.x,
            y: state.y
          }])
        });
      }

    default:
      return state;
  }
};