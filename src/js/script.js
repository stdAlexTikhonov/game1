let counter = 0;
let frames = 0;

const main = () => {
    if (frames % FPS === 0) {
        
    }
    window.requestAnimationFrame(main);
    frames++;
}

init();
