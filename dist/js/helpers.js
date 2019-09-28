"use strict";

var init = function init() {
  store.dispatch({
    type: START
  });
  store.dispatch({
    type: SET_HUNTER_DIRECTION
  });
  window.requestAnimationFrame(main);
}; //drawing


var clearWindow = function clearWindow() {
  context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); // clear canvas

  context.fillStyle = BACKGROUND;
  context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
};

var nextPlayerMove = function nextPlayerMove() {
  /*************** IF YOU WANT UNDERSTAND IT - GOOD LUCK **********************/
  var _store$getState = store.getState(),
      game = _store$getState.game,
      player = _store$getState.player;

  var direction = player.direction;
  var X = player.x * CELL_WIDTH + CELL_WIDTH / 2;
  var Y = player.y * CELL_WIDTH + CELL_WIDTH / 2;

  if (player.direction) {
    var _DIRECTION_MAPPING$di = DIRECTION_MAPPING[direction],
        axis = _DIRECTION_MAPPING$di.axis,
        direction_on_axis = _DIRECTION_MAPPING$di.direction_on_axis;
    var isX = axis === 'x';
    var isY = axis === 'y';
    var y = player.y + direction_on_axis;
    var x = player.x + direction_on_axis;
    var isWall = MAP_[isY ? y : player.y][isX ? x : player.x] === 0;

    if (isWall) {
      if (player.previousDirection === direction) store.dispatch({
        type: RESET_DIRECTION
      });

      if (MAP_[isY ? y : player.y + 1][isX ? x : player.x + 1] === 1) {
        return {
          Y: isY ? Y : Y + game.timer,
          X: isX ? X : X + game.timer
        };
      } else if (MAP_[isY ? y : player.y - 1][isX ? x : player.x - 1] === 1) {
        return {
          Y: isY ? Y : Y - game.timer,
          X: isX ? X : X - game.timer
        };
      }
    }

    return {
      Y: direction && !isWall && isY ? Y + game.timer * direction_on_axis : Y,
      X: direction && !isWall && isX ? X + game.timer * direction_on_axis : X
    };
  } else return {
    Y: Y,
    X: X
  };
};

var drawPlayer = function drawPlayer() {
  var _nextPlayerMove = nextPlayerMove(),
      X = _nextPlayerMove.X,
      Y = _nextPlayerMove.Y;

  context.beginPath();
  context.arc(X, Y, CELL_WIDTH / 2, 0, 2 * Math.PI, false);
  context.fillStyle = PLAYER_COLOR;
  context.fill();
  context.closePath();
};

var findPath = function findPath() {
  var _store$getState2 = store.getState(),
      hunter = _store$getState2.hunter,
      player = _store$getState2.player;

  var FSTART = FINDING_GRAPH.grid[hunter.y][hunter.x];
  var FEND = FINDING_GRAPH.grid[player.y][player.x];
  var PATH = astar.search(FINDING_GRAPH, FSTART, FEND).map(function (item) {
    return {
      y: item.x,
      x: item.y
    };
  });
  return PATH.map(function (item, i) {
    if (i === 0) {
      if (item.x > hunter.x) return RIGHT;else if (item.x < hunter.x) return LEFT;else if (item.y > hunter.y) return DOWN;else if (item.y < hunter.y) return UP;
    } else {
      if (item.x > PATH[i - 1].x) return RIGHT;else if (item.x < PATH[i - 1].x) return LEFT;else if (item.y > PATH[i - 1].y) return DOWN;else if (item.y < PATH[i - 1].y) return UP;
    }
  });
};

var drawHunter = function drawHunter() {
  var _store$getState3 = store.getState(),
      hunter1 = _store$getState3.hunter,
      player = _store$getState3.player;

  if (!hunter1.currentStep) {
    if (hunter1.x === player.x && hunter1.y === player.y) store.dispatch({
      type: STOP
    });
    var PATH = findPath();
    store.dispatch({
      type: SET_PATH,
      path: PATH
    });
    store.dispatch({
      type: SET_HUNTER_DIRECTION
    });
  }

  var _store$getState4 = store.getState(),
      hunter = _store$getState4.hunter,
      game = _store$getState4.game;

  var X = hunter.x * CELL_WIDTH;
  var Y = hunter.y * CELL_WIDTH;

  switch (hunter.currentStep) {
    case UP:
      Y -= game.timer;
      break;

    case DOWN:
      Y += game.timer;
      break;

    case LEFT:
      X -= game.timer;
      break;

    case RIGHT:
      X += game.timer;
      break;
  }

  context.beginPath();
  context.fillStyle = HUNTER_COLOR;
  context.rect(X, Y, CELL_WIDTH, CELL_WIDTH);
  context.fill();
  context.closePath();
};

var showPoints = function showPoints() {
  var _store$getState5 = store.getState(),
      player = _store$getState5.player;

  score.innerHTML = player.points;
};

var drawMap = function drawMap() {
  var _store$getState6 = store.getState(),
      player = _store$getState6.player;

  MAP_.forEach(function (item, i) {
    item.forEach(function (elem, j) {
      if (elem === 0) {
        context.fillStyle = WALL_COLOR;
        context.fillRect(CELL_WIDTH * j, CELL_WIDTH * i, CELL_WIDTH, CELL_WIDTH);
      } else {
        if (!player.foodMap.includes("".concat(i + '' + j))) {
          context.beginPath();
          context.arc(CELL_WIDTH * j + CELL_WIDTH / 2, CELL_WIDTH * i + CELL_WIDTH / 2, FOOD_SIZE, 0, 2 * Math.PI, false);
          context.fillStyle = FOOD_COLOR;
          context.fill();
          context.closePath();
        }
      }
    });
  });
};