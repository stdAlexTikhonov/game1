let time = 0;
let frames = 0;

const main = () => {
    if (frames % FPS === 0) {
        const { game, player } = store.getState();
        const { history, process } = game;

        if (process) {
            time++;
            console.log("STEP:",time, "GAME IN PROGRESS")
            console.log("DIRECTION:", player.direction);
        } else {
            console.log("GAME PAUSED")
        }
    }
    window.requestAnimationFrame(main);
    frames++;
}

init();
