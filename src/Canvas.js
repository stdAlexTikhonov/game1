import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    FPS,
    CELL_WIDTH,
    WALL_COLOR,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
    BACKGROUND,
    PLAYER_COLOR
} from './utils/constants'
import { setTimer, pause, start } from './actions/game'
import { swipeUp, swipeLeft, swipeRight, swipeDown } from './actions/player'
import { turboBoost } from './actions/player'
import { 
    getMapSelector,
    getUserSelector,
    getUsersSelector,
    getPlayerSelector,
    getGameSelector,
    getHunter1Selector,
    getHunter2Selector,
    getHunter3Selector
} from './selectors/test';

const height = window.innerHeight,
width = document.body.clientWidth

class Canvas extends Component {
    componentDidMount() {
        this.frame = 0;
        this.clicks = false;
        this.timer = null;
        this.gamePause = false;
        this.pointerX = undefined;
        this.pointerY = undefined;
        this.start();
    }


    clearWindow = () => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT); // clear canvas
        ctx.fillStyle = BACKGROUND;
        ctx.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    }

    drawMap = () => {
        const ctx = this.refs.canvas.getContext('2d');
        // const { player } = store.getState();
        const { map_ } = this.props;
    
        map_.forEach((item,i) => {
          item.forEach((elem,j) => {
            if (elem === 0) { 
                ctx.fillStyle = WALL_COLOR;
                ctx.fillRect(CELL_WIDTH*j, CELL_WIDTH * i, CELL_WIDTH, CELL_WIDTH);
            } 
            // else {
            //     if (!player.foodMap.includes(`${i + '' + j}`)) {
            //         context.beginPath();
            //         context.arc(CELL_WIDTH*j + CELL_WIDTH/2, CELL_WIDTH * i + CELL_WIDTH/2, FOOD_SIZE, 0, 2 * Math.PI, false);
            //         context.fillStyle = FOOD_COLOR;
            //         context.fill();
            //         context.closePath();
            //     }
            // }
          });
        });
    }

    drawPlayer = () => {
        const ctx = this.refs.canvas.getContext('2d');
        const { game, player } = this.props;
        let { isTurboActive, turboscores } = player;
        const { X, Y } = {X: 75, Y: 75 }
        // if (!game.pause) store.dispatch({ type: SAVE, x: X, y: Y}); 
        ctx.beginPath();
        ctx.arc(X, Y, CELL_WIDTH/2, 0, 2 * Math.PI, false);
        ctx.fillStyle = PLAYER_COLOR;
        ctx.fill();
        ctx.closePath();
        // if (isTurboActive) {
        //     store.dispatch({ type: SLOWDOWN});
        //     while(turboscores > 0) {
        //         store.dispatch({type: SET_PLAYER_POSITION}); 
        //         store.dispatch({type: SET_PLAYER_DIRECTION}); 
        //         drawPlayer();
        //         turboscores--;
        //         getDistances();
        //     }
        //     store.dispatch({ type: STOP_KILLER});
            
        // }
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }

    componentWillUnmount(){
        this.stop()
    }

    start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
        
    }

    stop = () => {
        const ctx = this.refs.canvas.getContext('2d');
        cancelAnimationFrame(this.frameId)
        ctx.clearRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }

    animate = () => {
        const { game } = this.props;
        this.frameId = window.requestAnimationFrame(this.animate)
        this.frame++;

        if (this.frame % FPS === 0) {
            if (!game.pause) {

            }

            this.clearWindow();
            this.drawMap();
            this.drawPlayer();
            this.props.dispatch(setTimer());
        }
    }

    clickHandle = () => {
        const self = this;
        this.timer = setTimeout(function(){
           if (!self.clicks) self.props.dispatch(pause())
           self.clicks = false;
        }, 300);
        
    }

    dblClickHandle = () => {
        this.clicks = true;
        clearTimeout(this.timer)
        this.props.dispatch(turboBoost())
    }

    pointerDown = (e) => {
        const { game } = this.props;
        this.gamePause = game.pause;
        this.pointerX = e.nativeEvent.offsetX;
        this.pointerY = e.nativeEvent.offsetY;
        if (game.pause) {
            this.props.dispatch(start());
            // container.removeChild(slider);
        };
    }

    pointerMove = (e) => {
        const diffLeft = e.nativeEvent.offsetX - this.pointerX;
        const diffUp = e.nativeEvent.offsetY - this.pointerY;
        const vertical = Math.abs(diffLeft) < Math.abs(diffUp);
    
    //    if (this.gamePause) {
    //         store.dispatch({ type: RESET_TIMELINE });
    //         const PATH = findPath();
    //         store.dispatch({ type: SET_PATH, path: PATH });
    //         store.dispatch({ type: SET_HUNTER_DIRECTION });
    //     }
    
        if (vertical) {
            if (e.nativeEvent.offsetY > this.pointerY) this.props.dispatch(swipeDown());
            else this.props.dispatch(swipeUp());
        } else {
            if (e.nativeEvent.offsetX > this.pointerX) this.props.dispatch(swipeRight());
            else this.props.dispatch(swipeLeft());
        }
    
    
    }

    render() {

        return (
            <div style={{
                height: '100vh',
                width: '100%',
                background: 'red'
            }}><canvas ref="canvas" onPointerDown={this.pointerDown} onPointerMove={this.pointerMove} onClick={this.clickHandle} onDoubleClick={this.dblClickHandle} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} style={{ width: '100%', height: '100vh'}} /></div>
        );
    }
}

function mapStateToProps (state) {
    return {
        map_: getMapSelector(state),
        user: getUserSelector(state),
        users: getUsersSelector(state),
        player: getPlayerSelector(state),
        hunter1: getHunter1Selector(state),
        hunter2: getHunter2Selector(state),
        hunter3: getHunter3Selector(state),
        game: getGameSelector(state)
    }
}

export default connect(mapStateToProps)(Canvas)