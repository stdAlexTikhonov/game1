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
                    store.dispatch({type: SET_HUNTER_POSITION2});
                    store.dispatch({type: SET_HUNTER_DIRECTION2});
                    store.dispatch({type: SET_HUNTER_POSITION3});
                    store.dispatch({type: SET_HUNTER_DIRECTION3});
                } 
  
            }

            
            clearWindow();
            drawMap();
            drawPlayer();
            drawHunter();
            drawHunter2();
            drawHunter3();
            showPoints();
            getDistances();

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
