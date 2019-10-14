const init = () => {
    store.dispatch({type: START});
    store.dispatch({type: SET_HUNTER_DIRECTION});
    window.requestAnimationFrame(main);
    MAP_ = mapSelector(3);
    FINDING_GRAPH = new Graph(MAP_);
}

const mapSelector = (seed) => {
    const maps = {
        1:"0000000000000000000-0111111111111111110-0101010101010101010-0111111111111111110-0101010101010101010-0111111111111111110-0101010101010101010-0111111111111111110-0101010101010101010-0111111111111111110-0101010101010101010-0111111111111111110-0101010101010101010-0111111111111111110-0000000000000000000",
        2:"0000000000000000000-0111011101110111010-0101110111011101110-0111011101110111010-0101110111011101110-0111011101110111010-0101110111011101110-0111011101110111010-0101110111011101110-0111011101110111010-0101110111011101110-0111011101110111010-0101110111011101110-0111011101110111010-0000000000000000000",
        3:"0000000000000000000-0111111111111111110-0100010100000000010-0101010111111111110-0111110100000000010-0101010111111111010-0100010001000001010-0111111111111101010-0100000100000101010-0111110111110101010-0100010100010101010-0101110111010101010-0100010100010101010-0111111111111111110-0000000000000000000",
        4:"0000000000000000000-0111011111111110110-0110110010011011010-0101101111101101110-0111011000110110110-0110110111011010100-0010101101101010110-0110111010101110110-0110101011101011100-0010101101011010100-0010110111110110110-0111011000001101100-0101101111111111010-0110111001100111110-0000000000000000000",
        5:"0000000000000000000-0111001011101111110-0101101110111010010-0100101000100010110-0111101111111110100-0100000100010100110-0111110101110111110-0101010101010100010-0101011111011101110-0101000001010001010-0101111111010111010-0111001000010101010-0100011111111101110-0111110011000101010-0000000000000000000",
        6:"0000000000000000000-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0111111111111111110-0000000000000000000",
        7:"0000000000000000000-0111011101110111010-0101010101010101010-0101010111010101110-0111011101011101010-0101010101010111010-0101110101110101110-0111010111011101010-0101011101010101010-0101010101110111010-0111010111010101110-0101110101011101010-0101010101010101010-0111011101110111010-0000000000000000000",
        8:"0000000000000000000-0111111111111111110-0101000010001000100-0111111111111111110-0010000100100100010-0111111111111111110-0100100010000100100-0111111111111111110-0001000100100010010-0111111111111111110-0100010000100001000-0111111111111111110-0010100010001000010-0111111111111111110-0000000000000000000",
    };

    return maps[seed].split('-').map(arr => arr.split('').map(elem => +elem));
}

//drawing
const clearWindow = () => {
    context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT); // clear canvas
    context.fillStyle = BACKGROUND;
    context.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
}

const setHunterPosition = (x,y,direction, value = 1) => {
    const { axis, direction_on_axis } = DIRECTION_MAPPING[direction];
    const isX = axis === 'x';
    const isY = axis === 'y';

    return {
        x: isX ? x + direction_on_axis * value : x,
        y: isY ? y + direction_on_axis * value : y
    }
}

const setPlayerPosition = () => {
    const { player } = store.getState();
    const { x, y, direction, isTurboActive } = player;
    const { axis, direction_on_axis } = DIRECTION_MAPPING[direction];
    const isX = axis === 'x';
    const isY = axis === 'y';
    const isWall = MAP_[isY ? y + direction_on_axis : y][isX ? x + direction_on_axis : x] === 0;

    if (isWall) {
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
    const { direction, turboscores, isTurboActive } = player;
    let X = player.x * CELL_WIDTH + CELL_WIDTH/2;
    let Y = player.y * CELL_WIDTH + CELL_WIDTH/2;

    if (!game.pause && player.direction) {
        const { axis, direction_on_axis } = DIRECTION_MAPPING[direction];
        const isX = axis === 'x';
        const isY = axis === 'y';
        const y = player.y + direction_on_axis;
        const x = player.x + direction_on_axis;
        const isWall = MAP_[isY ? y : player.y][isX ? x : player.x] === 0

        if (!isTurboActive && isWall) {
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
        if (game.index < player.history.length && game.pause) {
            const { x: x1, y: y1 } = player.history[game.index];
            const x =(x1 - CELL_WIDTH/2) / CELL_WIDTH;
            const y = (y1 - CELL_WIDTH/2) / CELL_WIDTH;
            if (Number.isInteger(x) && Number.isInteger(y)) store.dispatch({ type: SET_CALCULATED_PLAYER_POSITION, x, y})
            return { X: x1, Y: y1};
        }
        else return {X,Y}
    }
}

const drawPlayer = () => {
    const { game, player } = store.getState();
    let { isTurboActive, turboscores } = player;
    const { X, Y } = nextPlayerMove();
    if (!game.pause) store.dispatch({ type: SAVE, x: X, y: Y}); 
    context.beginPath();
    context.arc(X, Y, CELL_WIDTH/2, 0, 2 * Math.PI, false);
    context.fillStyle = PLAYER_COLOR;
    context.fill();
    context.closePath();
    if (isTurboActive) {
        store.dispatch({ type: SLOWDOWN});
        while(turboscores > 0) {
            store.dispatch({type: SET_PLAYER_POSITION}); 
            store.dispatch({type: SET_PLAYER_DIRECTION}); 
            drawPlayer();
            turboscores--;
        }
        
    }
}

function isPlayerHere(hunter) {
    const { player } = store.getState();
    const sameX = player.x === hunter.x;
    const sameY =  player.y === hunter.y;

    if (sameX) {
        return { y: player.y, x: player.x }
    } else if (sameY) {
        return { y: player.y, x: player.x }
    } else return false;
}

function findFreeCell(type, hunter) {
    const { player } = store.getState();
    const IPH = isPlayerHere(hunter);
    if (IPH) return IPH
            
    switch(type) {
        case 0:
            const startX = 1, startY = 1;
            const stopX = MAP_[0].length - 1, stopY = MAP_.length - 1;
            for(let y = startY; y < stopY; y++) {
                for (let x = startX; x < stopX; x++) {
                    if (MAP_[y][x] === 1 && !hunter.passedCells.includes(y + '' + x)) {
                        return { y, x };
                    }
                }
            }
        case 1:
            for(let y = MAP_.length - 2; y > 1; y--) {
                for (let x = MAP_[0].length - 2; x > 1; x--) {
                    if (MAP_[y][x] === 1 && !hunter.passedCells.includes(y + '' + x)) {
                        return { y, x };
                    }
                }
            } 
        case 2:
            for (let x = MAP_[0].length - 2; x > 1; x--) {
                for(let y = 1; y < MAP_.length - 1; y++) {
                    if (MAP_[y][x] === 1 && !hunter.passedCells.includes(y + '' + x)) {
                        return { y, x };
                    }
                }
            }
    }

    return { y: player.y, x: player.x }
}

const findPath = (type, hunter) => {
    const FSTART = FINDING_GRAPH.grid[hunter.y][hunter.x];
    const { y, x } = findFreeCell(type, hunter);
    const FEND = FINDING_GRAPH.grid[y][x];
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
        const PATH = findPath(0, hunter1);
        store.dispatch({type: SET_PATH, path: PATH});
        store.dispatch({type: SET_HUNTER_DIRECTION});
    }

    const { hunter, game } = store.getState();
    
    let X = hunter.x * CELL_WIDTH;
    let Y = hunter.y * CELL_WIDTH;

    if (!game.pause) {
        const {x, y} = hunter.currentStep ? setHunterPosition(X,Y, hunter.currentStep, game.timer) : { x: X, y: Y};

        X = x;
        Y = y;
        store.dispatch({ type: SAVE_HUNTER, x, y});
       
    } else {
        if (game.index < hunter.history.length) {
            const { x: x1, y: y1 } = hunter.history[game.index];
            const x = x1 / CELL_WIDTH;
            const y = y1 / CELL_WIDTH;
            if (Number.isInteger(x) && Number.isInteger(y)) store.dispatch({ type: SET_HUNTER_POSITION_FROM_HISTORY, x, y})
            
            X = x1;
            Y = y1;
        }
        
    }

    context.beginPath();
    context.fillStyle = HUNTER_COLOR;
    context.rect(X, Y, CELL_WIDTH, CELL_WIDTH);
    context.fill();
    context.closePath();

}

const drawHunter2 = () => {
    const { hunter2: hunter1, player } = store.getState();
    
    if (!hunter1.currentStep) {
        if (hunter1.x === player.x && hunter1.y === player.y) store.dispatch({type: STOP});
        const PATH = findPath(1, hunter1);
        store.dispatch({type: SET_PATH2, path: PATH});
        store.dispatch({type: SET_HUNTER_DIRECTION2});
    }

    const { hunter2: hunter, game } = store.getState();
    
    let X = hunter.x * CELL_WIDTH;
    let Y = hunter.y * CELL_WIDTH;

    if (!game.pause) {
        const {x, y} = hunter.currentStep ? setHunterPosition(X,Y, hunter.currentStep, game.timer) : { x: X, y: Y};

        X = x;
        Y = y;
        store.dispatch({ type: SAVE_HUNTER2, x, y});
       
    } else {
        if (game.index < hunter.history.length) {
            const { x: x1, y: y1 } = hunter.history[game.index];
            const x = x1 / CELL_WIDTH;
            const y = y1 / CELL_WIDTH;
            if (Number.isInteger(x) && Number.isInteger(y)) store.dispatch({ type: SET_HUNTER_POSITION_FROM_HISTORY2, x, y})
            
            X = x1;
            Y = y1;
        }
        
    }


    context.beginPath();
    context.fillStyle = HUNTER_COLOR2;
    context.rect(X, Y, CELL_WIDTH, CELL_WIDTH);
    context.fill();
    context.closePath();

}

const drawHunter3 = () => {
    const { hunter3: hunter1, player } = store.getState();
    
    if (!hunter1.currentStep) {
        if (hunter1.x === player.x && hunter1.y === player.y) store.dispatch({type: STOP});
        const PATH = findPath(2, hunter1);
        store.dispatch({type: SET_PATH3, path: PATH});
        store.dispatch({type: SET_HUNTER_DIRECTION3});
    }

    const { hunter3: hunter, game } = store.getState();
    
    let X = hunter.x * CELL_WIDTH;
    let Y = hunter.y * CELL_WIDTH;

    if (!game.pause) {
        const {x, y} = hunter.currentStep ? setHunterPosition(X,Y, hunter.currentStep, game.timer) : { x: X, y: Y};

        X = x;
        Y = y;
        store.dispatch({ type: SAVE_HUNTER3, x, y});
       
    } else {
        if (game.index < hunter.history.length) {
            const { x: x1, y: y1 } = hunter.history[game.index];
            const x = x1 / CELL_WIDTH;
            const y = y1 / CELL_WIDTH;
            if (Number.isInteger(x) && Number.isInteger(y)) store.dispatch({ type: SET_HUNTER_POSITION_FROM_HISTORY3, x, y})
            
            X = x1;
            Y = y1;
        }
        
    }


    context.beginPath();
    context.fillStyle = HUNTER_COLOR3;
    context.rect(X, Y, CELL_WIDTH, CELL_WIDTH);
    context.fill();
    context.closePath();

}

const showPoints = () => {
    const { player } = store.getState();
    score.innerHTML = 'Score: ' + player.points;
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