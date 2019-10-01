//styles
document.body.style.display = 'flex';
document.body.style.margin = 0;
document.body.style.padding = 0;

//container
const container = document.createElement('div');
container.style.margin = '0 auto';
container.style.display = 'flex';
container.style.width = WINDOW_WIDTH;
container.style.height = WINDOW_HEIGHT;
container.id = 'container';
document.body.appendChild(container);


//main menu
const block = document.createElement('div');
block.style.position = 'absolute';
block.style.display = 'flex';
block.style.fontFamily = 'Tahoma';
block.style.fontWeight = 'Bold';
block.style.margin = 'auto';
block.style.boxSizing = 'border-box';
block.style.width = WINDOW_WIDTH + 'px';
block.style.height = WINDOW_HEIGHT + 'px';
block.style.background = 'black';
block.style.textAlign = 'center';

block.className = 'start';
container.appendChild(block);
block.onpointerdown = e => {
    block.style.fontSize = '22pt';
}

block.onpointerup = e => {
    init();
    block.onpointerup = null;
    container.removeChild(block);
}

const text = document.createElement('div');
text.style.margin = 'auto';
text.innerHTML = ">>> PRESS TO START <<<";
block.appendChild(text);


//canvas
const canvas = document.createElement('canvas');
canvas.style.margin = 'auto';
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
container.appendChild(canvas);

//score block
const score = document.createElement('div');
score.style.fontFamily = 'Tahoma';
score.style.fontWeight = 'Bold';
score.innerHTML = 0;
document.body.appendChild(score);


const context = canvas.getContext('2d');

let pointerX, pointerY;
canvas.onpointerdown = e => {
    const { game } = store.getState();
    pointerX = e.offsetX;
    pointerY = e.offsetY;
    if (e.offsetY > WINDOW_HEIGHT - CELL_WIDTH && game.pause) return;
    else if (e.offsetY > WINDOW_HEIGHT - CELL_WIDTH) store.dispatch({type: PAUSE});
    else store.dispatch({type: START});
};

canvas.onpointermove = e => {
    const diffLeft = e.offsetX - pointerX;
    const diffUp = e.offsetY - pointerY;
    const vertical = Math.abs(diffLeft) < Math.abs(diffUp);
    // if (e.offsetY > WINDOW_HEIGHT - CELL_WIDTH) {
    //     if (e.offsetX > pointerX) store.dispatch({type: SWIPE_TIME_RIGHT});
    //     else store.dispatch({type: SWIPE_TIME_LEFT});
    // }  else 
    if (e.offsetY > WINDOW_HEIGHT - CELL_WIDTH) return; 

    if (vertical) {
        if (e.offsetY > pointerY) store.dispatch({type: SWIPEDOWN});
        else store.dispatch({type: SWIPEUP});
    } else {
        if (e.offsetX > pointerX) store.dispatch({type: SWIPERIGHT});
        else store.dispatch({type: SWIPELEFT});
    }
    
};

