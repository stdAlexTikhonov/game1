const init = () => {
    store.dispatch({type: START});
    window.requestAnimationFrame(main);
}

//drawing
const clearWindow = () => {
    context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT); // clear canvas
    context.fillStyle = BACKGROUND;
    context.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
}

const drawPlayer = (val) => {
    const { player } = store.getState();
    let X = player.x * CELL_WIDTH + CELL_WIDTH/2;
    let Y = player.y * CELL_WIDTH + CELL_WIDTH/2;
    switch(player.direction) {
        case UP:
            if (MAP_[player.y-1][player.x] === 1) store.dispatch({type: RESET_DIRECTION});
            else Y -= player.timer;
            break;
        case DOWN:
            if (MAP_[player.y+1][player.x] === 1) store.dispatch({type: RESET_DIRECTION});
            else Y += player.timer;
            break;
        case LEFT:
            if (MAP_[player.y][player.x-1] === 1) store.dispatch({type: RESET_DIRECTION});
            else X -= player.timer;
            break;
        case RIGHT:
            if (MAP_[player.y][player.x+1] === 1) store.dispatch({type: RESET_DIRECTION});
            else X += player.timer;
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

const drawMap = () => {
    context.fillStyle = WALL_COLOR;

    MAP_.forEach((item,i) => {
      item.forEach((elem,j) => {
        if (elem === 1) { 
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
