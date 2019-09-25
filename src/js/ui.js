//styles
document.body.style.display = 'flex';
document.body.style.margin = 0;
document.body.style.padding = 0;

//container
const container = document.createElement('div');
container.style.position = 'absolute';
container.style.display = 'flex';
container.style.width = '100%';
container.style.height = '100%';
document.body.appendChild(container);


//main menu
const block = document.createElement('div');
block.style.color = 'white';
block.style.fontFamily = 'Tahoma';
block.style.fontWeight = 'Bold';
block.style.margin = 'auto';
block.style.boxSizing = 'border-box';
block.style.width = WINDOW_WIDTH + 'px';
block.style.height = WINDOW_HEIGHT + 'px';
block.style.background = 'rgba(0,0,0,0.5)';
block.style.textAlign = 'center';
block.style.paddingTop = '300px';
block.style.fontSize = '32pt';
block.innerHTML = ">>> PRESS TO START <<<";
container.appendChild(block);
block.onpointerdown = e => {
    block.style.fontSize = '22pt';
}

block.onpointerup = e => {
    init();
    container.style.display = 'none';
}


//canvas
const canvas = document.createElement('canvas');
canvas.style.margin = 'auto';
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
document.body.appendChild(canvas);

//score block
const score = document.createElement('div');
score.style.fontFamily = 'Tahoma';
score.style.fontWeight = 'Bold';
score.innerHTML = 0;
document.body.appendChild(score);


const context = canvas.getContext('2d');

canvas.onpointerdown = onCanvasDownHandler;

canvas.onpointermove = onCanvasMoveHandler;
