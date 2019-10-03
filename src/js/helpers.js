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

const setPlayerPosition = (x,y,direction) => {
    const { axis, direction_on_axis } = DIRECTION_MAPPING[direction];
    const isX = axis === 'x';
    const isY = axis === 'y';
    const isWall = MAP_[isY ? y + direction_on_axis : y][isX ? x + direction_on_axis : x] === 0;

    if (isWall && direction) {
        if (MAP_[isY ? y+direction_on_axis : y+1][isX ? x+direction_on_axis : x+1] === 1) {
            return { 
                y: isY ? y : y + 1,
                x: isX ? x : x + 1
            }
        } else if (MAP_[isY ? y+direction_on_axis : y-1][isX ? x+direction_on_axis : x-1] === 1) {
            return { 
                y: isY ? y : y - 1,
                x: isX ? x : x - 1
            }
        } 
    }

    return {
        x: !isWall && isX ? x + direction_on_axis : x,
        y: !isWall && isY ? y + direction_on_axis : y
    }

}

const nextPlayerMove = () => {
    /*************** IF YOU WANT UNDERSTAND IT - GOOD LUCK **********************/
    const {game, player} = store.getState();
    const { direction } = player;
    let X = player.x * CELL_WIDTH + CELL_WIDTH/2;
    let Y = player.y * CELL_WIDTH + CELL_WIDTH/2;
    if (player.direction && !game.pause) {
        const { axis, direction_on_axis } = DIRECTION_MAPPING[direction];
        const isX = axis === 'x';
        const isY = axis === 'y';
        const y = player.y + direction_on_axis;
        const x = player.x + direction_on_axis;
        const isWall = MAP_[isY ? y : player.y][isX ? x : player.x] === 0
    
        if (isWall) {
            if (player.previousDirection === direction) store.dispatch({type: RESET_DIRECTION});
            if (MAP_[isY ? y : player.y+1][isX ? x : player.x+1] === 1) {
                return {
                    Y: isY ? Y : Y + game.timer,
                    X: isX ? X : X + game.timer
                 }
            } else if (MAP_[isY ? y : player.y-1][isX ? x : player.x-1] === 1) {
                return {
                    Y: isY ? Y : Y - game.timer,
                    X: isX ? X : X - game.timer
                }
            }
        }
    

    return {
            Y: direction && !isWall && isY ? Y + game.timer * direction_on_axis : Y,
            X: direction && !isWall && isX ? X + game.timer * direction_on_axis : X
        }
    } else {
        switch(direction) {
            case UP:
                Y -= game.savedTimerPosition;
                break;
            case DOWN:
                Y += game.savedTimerPosition;
                break;
            case LEFT:
                X -= game.savedTimerPosition;
                break;
            case RIGHT:
                X += game.savedTimerPosition;
                break;
        }
        return {Y,X}
    }
}

const drawPlayer = () => {
    const { X, Y } = nextPlayerMove();
    context.beginPath();
    context.arc(X, Y, CELL_WIDTH/2, 0, 2 * Math.PI, false);
    context.fillStyle = PLAYER_COLOR;
    context.fill();
    context.closePath();
}

const drawTimeScale = () => {
    const { timeline, game } = store.getState();
    context.beginPath();
    switch(timeline.direction) {
        case LEFT:
            context.moveTo(100, WINDOW_HEIGHT - CELL_WIDTH);
            context.lineTo(100, WINDOW_HEIGHT)
            break;
        case RIGHT:
            context.moveTo(800 , WINDOW_HEIGHT - CELL_WIDTH);
            context.lineTo(800, WINDOW_HEIGHT)
            break;
        default:
            context.moveTo(450, WINDOW_HEIGHT - CELL_WIDTH);
            context.lineTo(450, WINDOW_HEIGHT)
            break;
    }
    context.lineWidth = 2;
    context.strokeStyle = 'red';
    context.stroke()
    context.closePath()
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
    const { hunter: hunter1, player } = store.getState();
    
    if (!hunter1.currentStep) {
        if (hunter1.x === player.x && hunter1.y === player.y) store.dispatch({type: STOP});
        const PATH = findPath();
        store.dispatch({type: SET_PATH, path: PATH});
        store.dispatch({type: SET_HUNTER_DIRECTION});
    }

    const { hunter, game } = store.getState();
    

    let X = hunter.x * CELL_WIDTH;
    let Y = hunter.y * CELL_WIDTH;

    if (!game.pause) {
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
    } else {
        switch(hunter.currentStep) {
            case UP:
                Y -= game.savedTimerPosition;
                break;
            case DOWN:
                Y += game.savedTimerPosition;
                break;
            case LEFT:
                X -= game.savedTimerPosition;
                break;
            case RIGHT:
                X += game.savedTimerPosition;
                break;
        } 
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