const init = () => {
    store.dispatch({type: START});
    store.dispatch({type: SET_HUNTER_DIRECTION});
    window.requestAnimationFrame(main);
}

//drawing
const clearWindow = () => {
    context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT); // clear canvas
    context.fillStyle = BACKGROUND;
    context.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
}

const drawPlayer = () => {
    const { player, game } = store.getState();
    let X = player.x * CELL_WIDTH + CELL_WIDTH/2;
    let Y = player.y * CELL_WIDTH + CELL_WIDTH/2;
  
    switch(player.direction) {
        case UP:
            if (MAP_[player.y-1][player.x] === 0) {
                if (player.previousDirection === UP) store.dispatch({type: RESET_DIRECTION});
                if (MAP_[player.y-1][player.x+1] === 1) {
                    X += game.timer;
                } else if (MAP_[player.y-1][player.x-1] === 1) {
                    X -= game.timer;
                }
            }
            else Y -= game.timer;
            break;
        case DOWN:
            if (MAP_[player.y+1][player.x] === 0) {
                if (player.previousDirection === DOWN) store.dispatch({type: RESET_DIRECTION});
                else if (MAP_[player.y+1][player.x+1] === 1) {
                    X += game.timer;
                } else if (MAP_[player.y+1][player.x-1] === 1) {
                    X -= game.timer;
                }
            }
            else Y += game.timer;
            break;
        case LEFT:
            if (MAP_[player.y][player.x-1] === 0) {
                if (player.previousDirection === LEFT) store.dispatch({type: RESET_DIRECTION});
                else if (MAP_[player.y+1][player.x-1] === 1) {
                    Y += game.timer;
                } else if (MAP_[player.y-1][player.x-1] === 1) {
                    Y -= game.timer;
                }
            }
            else X -= game.timer;
            break;
        case RIGHT:
            if (MAP_[player.y][player.x+1] === 0) {
                if (player.previousDirection === RIGHT) store.dispatch({type: RESET_DIRECTION});
                else if (MAP_[player.y+1][player.x+1] === 1) {
                    Y += game.timer;
                } else if (MAP_[player.y-1][player.x+1] === 1) {
                    Y -= game.timer;
                }
            }
            else X += game.timer;
            break;
    }
    context.beginPath();
    context.arc(X, Y, CELL_WIDTH/2, 0, 2 * Math.PI, false);
    context.fillStyle = PLAYER_COLOR;
    context.fill();
    context.closePath();
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = '#003300';
    // ctx.stroke();
}

const findPath = () => {
    const { hunter, player } = store.getState();
    const FSTART = FINDING_GRAPH.grid[hunter.y][hunter.x];
    const FEND = FINDING_GRAPH.grid[player.y][player.x];
    const PATH = astar.search(FINDING_GRAPH, FSTART, FEND).map(item => ({ y: item.x, x: item.y}));
    
    return PATH.map((item,i) => {
        if (i === 0) {
            if (item.x > hunter.x) return RIGHT;
            else if (item.x < hunter.x) return LEFT;
            else if (item.y > hunter.y) return DOWN;
            else if (item.y < hunter.y) return UP;
        } else {
            if (item.x > PATH[i-1].x) return RIGHT;
            else if (item.x < PATH[i-1].x) return LEFT;
            else if (item.y > PATH[i-1].y) return DOWN;
            else if (item.y < PATH[i-1].y) return UP;
        }
    });
}

const drawHunter = () => {
    
    const { hunter: hunter1 } = store.getState();
    if (!hunter1.currentStep) {
        const PATH = findPath();
        store.dispatch({type: SET_PATH, path: PATH});
        store.dispatch({type: SET_HUNTER_DIRECTION});
    }

    const { hunter, game } = store.getState();
  
    let X = hunter.x * CELL_WIDTH;
    let Y = hunter.y * CELL_WIDTH;

    switch(hunter.currentStep) {
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
}

const showPoints = () => {
    const { player } = store.getState();
    score.innerHTML = player.points;
}

const drawMap = () => {
    const { player } = store.getState();

    MAP_.forEach((item,i) => {
      item.forEach((elem,j) => {
        if (elem === 0) { 
            context.fillStyle = WALL_COLOR;
            context.fillRect(CELL_WIDTH*j, CELL_WIDTH * i, CELL_WIDTH, CELL_WIDTH);
        } else {
            if (!player.foodMap.includes(`${i + '' + j}`)) {
                context.beginPath();
                context.arc(CELL_WIDTH*j + CELL_WIDTH/2, CELL_WIDTH * i + CELL_WIDTH/2, FOOD_SIZE, 0, 2 * Math.PI, false);
                context.fillStyle = FOOD_COLOR;
                context.fill();
                context.closePath();
            }
        }
      });
    });
}


//user actions
let pointerX, pointerY;
const onCanvasDownHandler = e => {
    pointerX = e.offsetX;
    pointerY = e.offsetY;
}

const onCanvasMoveHandler = e => {
    const diffLeft = e.offsetX - pointerX;
    const diffUp = e.offsetY - pointerY;
    const vertical = Math.abs(diffLeft) < Math.abs(diffUp);
    
    if (vertical) {
        if (e.offsetY > pointerY) store.dispatch({type: SWIPEDOWN});
        else store.dispatch({type: SWIPEUP});
    } else {
        if (e.offsetX > pointerX) store.dispatch({type: SWIPERIGHT});
        else store.dispatch({type: SWIPELEFT});
    }
    
}
