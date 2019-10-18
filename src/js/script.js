let frames = 0;

const main = () => {
    if (frames % FPS === 0) {
        const { game, hunter, hunter2, hunter3 } = store.getState();
        const { process, pause } = game;

        if (process) {
            if (!pause) {
                
                if (game.timer === 0) {
                    hunter.alive && store.dispatch({type: SET_HUNTER_POSITION});
                    hunter.alive && store.dispatch({type: SET_HUNTER_DIRECTION});
                    store.dispatch({type: SET_PLAYER_POSITION}); 
                    store.dispatch({type: SET_PLAYER_DIRECTION});
                    hunter2.alive && store.dispatch({type: SET_HUNTER_POSITION2});
                    hunter2.alive && store.dispatch({type: SET_HUNTER_DIRECTION2});
                    hunter3.alive && store.dispatch({type: SET_HUNTER_POSITION3});
                    hunter3.alive && store.dispatch({type: SET_HUNTER_DIRECTION3});
                } 
  
            }

            
            clearWindow();
            drawMap();
            drawPlayer();
            hunter.alive && drawHunter();
            hunter2.alive && drawHunter2();
            hunter3.alive && drawHunter3();
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
