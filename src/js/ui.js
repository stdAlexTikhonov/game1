//styles
document.body.style.display = 'flex';
document.body.style.margin = 0;
document.body.style.padding = 0;

//container
const container = document.createElement('div');
container.style.margin = '0 auto';
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.width = WINDOW_WIDTH;
container.style.height = WINDOW_HEIGHT;
container.id = 'container';
document.body.appendChild(container);


//main menu
const menu = document.createElement('div');
menu.style.position = 'absolute';
menu.style.display = 'flex';
menu.style.fontFamily = 'Tahoma';
menu.style.fontWeight = 'Bold';
menu.style.margin = 'auto';
menu.style.boxSizing = 'border-box';
menu.style.width = WINDOW_WIDTH + 'px';
menu.style.height = WINDOW_HEIGHT + 'px';
menu.style.background = 'black';
menu.style.flexDirection = 'column';
menu.style.fontFamily = 'Tahoma';
menu.style.fontWeight = 'bold';
menu.style.fontSize = '20px';
menu.style.color = 'white';
menu.style.padding = '20px 0';
container.appendChild(menu);

const header = document.createElement('div');
header.innerHTML = 'Template';
header.style.color = 'white';
header.style.borderBottom = '2px solid';
header.style.padding = '0 20px';
menu.appendChild(header);

const content = document.createElement('div');
content.style.flexGrow = 1;
content.style.display = 'flex';
content.style.padding = '20px';

const template = document.createElement('div');
template.style.width = '100px';
template.style.height = '100px';
template.style.border = '2px solid white';
template.style.borderRadius = '25px';

template.onclick = () => {
    init();
    container.removeChild(menu);
    container.appendChild(infoblock);
}

content.appendChild(template);

menu.appendChild(content);

const footer = document.createElement('div');
footer.style.color = 'white';
footer.style.borderTop = '2px solid';
footer.style.display = 'flex';
footer.style.padding = '10px 20px 0';
footer.style.justifyContent = 'space-between';


const leftBtn = document.createElement('div');
leftBtn.innerHTML = 'Options';
footer.appendChild(leftBtn);

const exitBtn = document.createElement('div');
exitBtn.innerHTML = 'Exit';

exitBtn.onclick = () => window.close();
footer.appendChild(exitBtn);



menu.appendChild(footer);


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


//infoblock
const infoblock = document.createElement('div');
infoblock.style.borderTop = '2px solid white';
infoblock.style.padding = '10px 20px';
infoblock.style.fontWeight = 'bold';
infoblock.style.display = 'flex';
infoblock.style.background = 'black';

//score block
const score = document.createElement('div');
score.style.fontFamily = 'Tahoma';
score.style.fontWeight = 'Bold';
score.style.color = 'white';
score.innerHTML = 0;
infoblock.appendChild(score);




const context = canvas.getContext('2d');

let pointerX, pointerY, gamePause = false;
canvas.onpointerdown = e => {
    const { game } = store.getState();
    gamePause = game.pause;
    pointerX = e.offsetX;
    pointerY = e.offsetY;
    if (game.pause) {
        store.dispatch({ type: START });
        container.removeChild(slider);
    };
};

canvas.onpointermove = e => {
    const diffLeft = e.offsetX - pointerX;
    const diffUp = e.offsetY - pointerY;
    const vertical = Math.abs(diffLeft) < Math.abs(diffUp);

   if (gamePause) {
        store.dispatch({ type: RESET_TIMELINE });
        const PATH = findPath();
        store.dispatch({ type: SET_PATH, path: PATH });
        store.dispatch({ type: SET_HUNTER_DIRECTION });
    }

    if (vertical) {
        if (e.offsetY > pointerY) store.dispatch({ type: SWIPEDOWN });
        else store.dispatch({ type: SWIPEUP });
    } else {
        if (e.offsetX > pointerX) store.dispatch({ type: SWIPERIGHT });
        else store.dispatch({ type: SWIPELEFT });
    }


};

const slider = document.createElement('input');
slider.style.position = 'absolute';
slider.style.top = WINDOW_HEIGHT - CELL_WIDTH/2 + 'px';
slider.style.width = WINDOW_WIDTH + 'px';
slider.setAttribute('type', 'range');
slider.setAttribute('min', 0);
slider.setAttribute('max', HISTORY_LENGTH);
slider.value = 0;
slider.setAttribute('step', 1);

slider.oninput = (e) => {
    store.dispatch({ type: SET_INDEX, index: e.target.value });
}


let clicks = 0;
canvas.onclick = () => {
    clicks++;
    if (clicks == 1) {
      setTimeout(function(){
        if(clicks == 1) {
            store.dispatch({ type: PAUSE });
            slider.value = 0;
            container.appendChild(slider);
        } else {
            store.dispatch({ type: TURBOBOOST });
        }
        clicks = 0;
      }, 300);

    }
}
