let frames = 0;

const main = () => {
    if (frames % FPS === 0) {
        
        const { game, timeline } = store.getState();
        const { process, pause } = game;

        if (process) {
            if (!pause) {
                if (game.timer === 0) {
                    store.dispatch({type: SAVE});
                    store.dispatch({type: SET_HUNTER_POSITION});
                    store.dispatch({type: SET_HUNTER_DIRECTION});
                    store.dispatch({type: SET_DIRECTION}); 
                } 

            }

            
            clearWindow();
            drawMap();
            game.pause && drawTimeScale();
            drawPlayer();
            drawHunter();
            showPoints();

            
            // else {
            //     if (!timeline.timemashine) {
            //         store.dispatch({type: REVERSE_HISTORY});
            //     }
            //     store.dispatch({type: SET_TIME_POSITION});
            //     if (game.timer === 0) {
            //         store.dispatch({type: SET_POSITION_FROM_HISTORY, index: timeline.index});
            //         clearWindow();
            //         drawMap();
            //         drawPlayer();
            //         drawHunter();
            //         showPoints();
                    
            //     }
            //     drawLine();
            // }
            window.requestAnimationFrame(main);
        } else {
            container.appendChild(block);
            score.style.display = 'none';
            text.innerHTML = 'YOU DEAD';
            block.classList.add('finished');
            
        }

        store.dispatch({type: SET_TIMER});

    }
    
    frames++;
}
