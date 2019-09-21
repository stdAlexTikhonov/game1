let time = 0;
let frames = 0;
let flag = false;


const main = () => {
    if (frames % FPS === 0) {
        store.dispatch({type: SET_TIMER});
        const { game, player } = store.getState();
        const { history, process } = game;
      
        if (flag && player.timer === 0) {
            store.dispatch({type: SET_DIRECTION});
            switch(player.direction) {
                case LEFT:
                    store.dispatch({type: SET_PLAYER_X, position: player.x - 1});
                    break;
                case RIGHT:
                    store.dispatch({type: SET_PLAYER_X, position: player.x + 1});
                    break;
                case UP:
                    store.dispatch({type: SET_PLAYER_Y, position: player.y - 1});
                    break;
                case DOWN:
                    store.dispatch({type: SET_PLAYER_Y, position: player.y + 1});
                    break;
            }
        }

        if (process) {
            time++;
            //drawing==========================
            clearWindow();
            drawPlayer();
            //logging==========================
            // console.log("STEP:",time, "GAME IN PROGRESS")
            // console.log("DIRECTION:", player.direction);
            console.log("POS timer: ", player.timer);
        } else {
            console.log("GAME PAUSED")
        }
        flag = true;
    }
    window.requestAnimationFrame(main);
    frames++;
}
