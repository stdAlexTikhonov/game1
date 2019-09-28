"use strict";

var app = function app() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return {
    player: playerReducer(state.player, action),
    game: gameReducer(state.game, action),
    hunter: hunterReducer(state.hunter, action)
  };
};