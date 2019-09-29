let frames = 0;

const main = () => {
    if (frames % FPS === 0) {
        store.dispatch({type: SET_TIMER});
        
        const { game } = store.getState();
        const { process, pause } = game;

        if (process) {
            if (!pause) {
                if (game.timer === 0) {
                    store.dispatch({type: SAVE});
                    store.dispatch({type: SET_HUNTER_POSITION});
                    store.dispatch({type: SET_HUNTER_DIRECTION});
                    store.dispatch({type: SET_DIRECTION}); 
                } else {
                   
                }

                clearWindow();
                drawMap();
                drawPlayer();
                drawHunter();
                showPoints();
 
            } 



            if (pause) {
                store.dispatch({type: SET_TIME_POSITION});
                clearWindow();
                drawMap();
                drawPlayer();
                drawHunter();
                showPoints();
                drawLine();
            }
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
