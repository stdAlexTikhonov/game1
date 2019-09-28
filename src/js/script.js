let frames = 0;

const main = () => {
    if (frames % FPS === 0) {
        store.dispatch({type: SET_TIMER});
        
        const { game } = store.getState();
        const { process } = game;

        if (process) {
            
            if (game.timer === 0) {
                store.dispatch({type: SAVE});
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
            window.requestAnimationFrame(main);
        } else {
            container.appendChild(block);
            score.style.display = 'none';
            text.innerHTML = 'YOU DEAD';
            block.classList.add('finished');
            
        }

    }
    
    frames++;
}
