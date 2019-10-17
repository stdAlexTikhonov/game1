"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initTimeline = {
  direction: null,
  index: 0
};

var timelineReducer = function timelineReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initTimeline;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SWIPE_TIME_LEFT:
      return _objectSpread({}, state, {
        direction: LEFT
      });

    case SWIPE_TIME_RIGHT:
      return _objectSpread({}, state, {
        direction: RIGHT
      });

    case PAUSE_TIME:
      return _objectSpread({}, state, {
        direction: null
      });

    case SET_INDEX:
      return _objectSpread({}, state, {
        index: state.index + action.index
      });

    case RESET_TIMELINE:
      return initTimeline;

    default:
      return state;
  }
};