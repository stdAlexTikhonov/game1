let frames = 0;

const main = () => {
    if (frames % FPS === 0) {
        const { game } = store.getState();
        const { process, pause } = game;

        if (process) {
            if (!pause) {
                
                if (game.timer === 0) {
                    store.dispatch({type: SET_HUNTER_POSITION});
                    store.dispatch({type: SET_HUNTER_DIRECTION});
                    store.dispatch({type: SET_PLAYER_POSITION}); 
                    store.dispatch({type: SET_PLAYER_DIRECTION}); 
                } 
  
            }

            
            clearWindow();
            drawMap();
            game.pause && drawTimeScale();
            drawPlayer();
            drawHunter();
            showPoints();

        } else {
            container.appendChild(block);
            container.removeChild(infoblock);
            text.innerHTML = 'YOU DEAD';
            block.classList.add('finished');
            
        }

        store.dispatch({type: SET_TIMER});
        if (process) window.requestAnimationFrame(main);
    }
    
    frames++;
    
}
