let frames = 0;

const main = () => {
    if (frames % FPS === 0) {
        store.dispatch({type: SET_TIMER});
        
        const { game } = store.getState();
        const { history, process } = game;

        if (process) {
            
            if (game.timer === 0) {
                store.dispatch({type: SET_HUNTER_POSITION});
                store.dispatch({type: SET_HUNTER_DIRECTION});
                store.dispatch({type: SET_DIRECTION}); 
            }
            
            //drawing==========================
            clearWindow();
            drawMap();
            drawPlayer();
            drawHunter();
            showPoints();
            //logging==========================
            // console.log("STEP:",time, "GAME IN PROGRESS")
            // console.log("DIRECTION:", player.direction);
            // console.log("POS timer: ", player.timer);

        } else {
            container.style.display = 'flex';
            score.style.display = 'none';
            block.innerHTML = 'YOU DEAD';
            block.classList.add('finished');
        }

    }
    window.requestAnimationFrame(main);
    frames++;
}
