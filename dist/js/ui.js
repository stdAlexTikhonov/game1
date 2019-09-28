"use strict";

//styles
document.body.style.display = 'flex';
document.body.style.margin = 0;
document.body.style.padding = 0; //container

var container = document.createElement('div');
container.style.margin = 'auto';
container.style.display = 'flex';
container.style.width = WINDOW_WIDTH;
container.style.height = WINDOW_HEIGHT;
container.id = 'container';
document.body.appendChild(container); //main menu

var block = document.createElement('div');
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

block.onpointerdown = function (e) {
  block.style.fontSize = '22pt';
};

block.onpointerup = function (e) {
  init();
  block.onpointerup = null;
  container.removeChild(block);
};

var text = document.createElement('div');
text.style.margin = 'auto';
text.innerHTML = ">>> PRESS TO START <<<";
block.appendChild(text); //canvas

var canvas = document.createElement('canvas');
canvas.style.margin = 'auto';
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
container.appendChild(canvas); //score block

var score = document.createElement('div');
score.style.fontFamily = 'Tahoma';
score.style.fontWeight = 'Bold';
score.innerHTML = 0;
document.body.appendChild(score);
var context = canvas.getContext('2d');
var pointerX, pointerY;

canvas.onpointerdown = function (e) {
  pointerX = e.offsetX;
  pointerY = e.offsetY;
};

canvas.onpointermove = function (e) {
  var diffLeft = e.offsetX - pointerX;
  var diffUp = e.offsetY - pointerY;
  var vertical = Math.abs(diffLeft) < Math.abs(diffUp);

  if (vertical) {
    if (e.offsetY > pointerY) store.dispatch({
      type: SWIPEDOWN
    });else store.dispatch({
      type: SWIPEUP
    });
  } else {
    if (e.offsetX > pointerX) store.dispatch({
      type: SWIPERIGHT
    });else store.dispatch({
      type: SWIPELEFT
    });
  }
};