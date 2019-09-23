const init = () => {
    store.dispatch({type: START});
    store.dispatch({type: SET_GHOST_DIRECTION});
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
            if (MAP_[player.y-1][player.x] === 0) store.dispatch({type: RESET_DIRECTION});
            else Y -= game.timer;
            break;
        case DOWN:
            if (MAP_[player.y+1][player.x] === 0) store.dispatch({type: RESET_DIRECTION});
            else Y += game.timer;
            break;
        case LEFT:
            if (MAP_[player.y][player.x-1] === 0) store.dispatch({type: RESET_DIRECTION});
            else X -= game.timer;
            break;
        case RIGHT:
            if (MAP_[player.y][player.x+1] === 0) store.dispatch({type: RESET_DIRECTION});
            else X += game.timer;
            break;
    }
    context.beginPath();
    context.arc(X, Y, CELL_WIDTH/2, 0, 2 * Math.PI, false);
    context.fillStyle = 'yellow';
    context.fill();
    context.closePath();
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = '#003300';
    // ctx.stroke();
}

const findPath = () => {
    const { ghost1, player } = store.getState();
    const FSTART = FINDING_GRAPH.grid[ghost1.y][ghost1.x];
    const FEND = FINDING_GRAPH.grid[player.y][player.x];
    const PATH = astar.search(FINDING_GRAPH, FSTART, FEND).map(item => ({ y: item.x, x: item.y}));
    
    return PATH.map((item,i) => {
        if (i === 0) {
            if (item.x > ghost1.x) return RIGHT;
            else if (item.x < ghost1.x) return LEFT;
            else if (item.y > ghost1.y) return DOWN;
            else if (item.y < ghost1.y) return UP;
        } else {
            if (item.x > PATH[i-1].x) return RIGHT;
            else if (item.x < PATH[i-1].x) return LEFT;
            else if (item.y > PATH[i-1].y) return DOWN;
            else if (item.y < PATH[i-1].y) return UP;
        }
    });
}

const drawGhost = () => {
    const { ghost1, game } = store.getState();
    
    if (!ghost1.currentStep) {
        const PATH = findPath();
        store.dispatch({type: SET_PATH, path: PATH});
    }
  
    let X = ghost1.x * CELL_WIDTH;
    let Y = ghost1.y * CELL_WIDTH;

    switch(ghost1.currentStep) {
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
    context.fillStyle = 'blue';
    context.rect(X, Y, CELL_WIDTH, CELL_WIDTH);
    context.fill();
    context.closePath();
}

const drawMap = () => {
    context.fillStyle = WALL_COLOR;

    MAP_.forEach((item,i) => {
      item.forEach((elem,j) => {
        if (elem === 0) { 
          context.fillRect(CELL_WIDTH*j, CELL_WIDTH * i, CELL_WIDTH, CELL_WIDTH);
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
