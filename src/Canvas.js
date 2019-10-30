import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared' 
import {
    FPS,
    CELL_WIDTH,
    WALL_COLOR,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
    BACKGROUND,
    PLAYER_COLOR,
    DIRECTION_MAPPING,
    FOOD_COLOR,
    FOOD_SIZE,
    HUNTER_COLOR,
    UP, DOWN, RIGHT, LEFT
} from './utils/constants'
import { 
    setTimer, 
    pause, 
    start,
    stop
} from './actions/game'
import {
    swipeUp, 
    swipeLeft,
    swipeRight,
    swipeDown,
    setPlayerDirection,
    setPlayerPosition,
    setCalculatedPlayerPosition,
    resetDirection,
    turboBoost,
    slowDown,
    stopKiller
} from './actions/player'
import {
    killHunter,
    setPath,
    setHunterDirection,
    setHunterPosition
} from './actions/hunter'
import {
    getMapSelector,
    getUserSelector,
    getUsersSelector,
    getPlayerSelector,
    getGameSelector,
    getHunter1Selector,
    getHunter2Selector,
    getHunter3Selector,
    getHunterSelector
} from './selectors/test';
import { astar, Graph } from 'astar';

const height = window.innerHeight,
    width = document.body.clientWidth

class Canvas extends Component {
    componentDidMount() {
        const { map_ } = this.props;

        this.frame = 0;
        this.clicks = false;
        this.timer = null;
        this.gamePause = false;
        this.pointerX = undefined;
        this.pointerY = undefined;
        this.FINDING_GRAPH = new Graph(map_);
        this.start();

        console.log('history', this.props.history);
    }


    clearWindow = () => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); // clear canvas
        ctx.fillStyle = BACKGROUND;
        ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }

    drawMap = () => {
        const ctx = this.refs.canvas.getContext('2d');
        const { player } = this.props;
        const { map_ } = this.props;

        map_.forEach((item, i) => {
            item.forEach((elem, j) => {
                if (elem === 0) {
                    ctx.fillStyle = WALL_COLOR;
                    ctx.fillRect(CELL_WIDTH * j, CELL_WIDTH * i, CELL_WIDTH, CELL_WIDTH);
                }
                else {
                    if (!player.foodMap.includes(`${i + '' + j}`)) {
                        ctx.beginPath();
                        ctx.arc(CELL_WIDTH*j + CELL_WIDTH/2, CELL_WIDTH * i + CELL_WIDTH/2, FOOD_SIZE, 0, 2 * Math.PI, false);
                        ctx.fillStyle = FOOD_COLOR;
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            });
        });
    }

    nextPlayerMove = () => {
        /*************** IF YOU WANT UNDERSTAND IT - GOOD LUCK **********************/
        const { game, player, map_ } = this.props;
        const { direction, turboscores, isTurboActive } = player;
        let X = player.x * CELL_WIDTH + CELL_WIDTH / 2;
        let Y = player.y * CELL_WIDTH + CELL_WIDTH / 2;

        if (!game.pause && player.direction) {
            const { axis, direction_on_axis } = DIRECTION_MAPPING[direction];
            const isX = axis === 'x';
            const isY = axis === 'y';
            const y = player.y + direction_on_axis;
            const x = player.x + direction_on_axis;
            const isWall = map_[isY ? y : player.y][isX ? x : player.x] === 0

            if (!isTurboActive && isWall) {
                if (player.previousDirection === direction) this.props.dispatch(resetDirection());
                if (map_[isY ? y : player.y + 1][isX ? x : player.x + 1] === 1) {
                    return {
                        Y: isY ? Y : Y + game.timer,
                        X: isX ? X : X + game.timer
                    }
                } else if (map_[isY ? y : player.y - 1][isX ? x : player.x - 1] === 1) {
                    return {
                        Y: isY ? Y : Y - game.timer,
                        X: isX ? X : X - game.timer
                    }
                }
            }


            return {
                Y: direction && !isWall && isY ? Y + game.timer * direction_on_axis : Y,
                X: direction && !isWall && isX ? X + game.timer * direction_on_axis : X
            }
        } else {
            if (game.index < player.history.length && game.pause) {
                const { x: x1, y: y1 } = player.history[game.index];
                const x = (x1 - CELL_WIDTH / 2) / CELL_WIDTH;
                const y = (y1 - CELL_WIDTH / 2) / CELL_WIDTH;
                if (Number.isInteger(x) && Number.isInteger(y)) this.props.dispatch(setCalculatedPlayerPosition(x, y))
                return { X: x1, Y: y1 };
            }
            else return { X, Y }
        }
    }

    getDistances = () => {
        const { player, hunter1, hunter2, hunter3 } = this.props;
    
        //hunter1 + player
        const aph = Math.pow(player.x - hunter1.x, 2);
        const bph = Math.pow(player.y - hunter1.y, 2);
        const ph = Math.sqrt(aph + bph);
        const phSame = player.x === hunter1.x || player.y === hunter1.y;
    
        //hunter2 + player
        const aph2 = Math.pow(player.x - hunter2.x, 2);
        const bph2 = Math.pow(player.y - hunter2.y, 2);
        const ph2 = Math.sqrt(aph2 + bph2);
        const ph2Same = player.x === hunter2.x || player.y === hunter2.y;
    
        //hunter3 + player
        const aph3 = Math.pow(player.x - hunter3.x, 2);
        const bph3 = Math.pow(player.y - hunter3.y, 2);
        const ph3 = Math.sqrt(aph3 + bph3);
        const ph3Same = player.x === hunter3.x || player.y === hunter3.y;
    
        const flag = (phSame && ph < 2) || (ph2Same && ph2 < 2) || (ph3Same && ph3 < 2);
    
        if (player.killer && phSame && ph < 2) this.props.dispatch(killHunter("8xf0y6ziyjabvozdd253nd"));
        else if (player.killer && ph2Same && ph2 < 2) this.props.dispatch(killHunter("8xf0y6ziyjabvozdd253n2"));
        else if (player.killer && ph3Same && ph3 < 2) this.props.dispatch(killHunter("8xf0y6ziyjabvozdd253n3"));
        else if (flag) { 
            this.props.dispatch(stop()); 
            this.props.dispatch(handleInitialData());
            this.props.history.push('/end');
        }
    }
   
    drawPlayer = () => {
        const ctx = this.refs.canvas.getContext('2d');
        const { game, player, map_ } = this.props;
        let { isTurboActive, turboscores } = player;
        const { X, Y } = this.nextPlayerMove();
        // if (!game.pause) store.dispatch({ type: SAVE, x: X, y: Y}); 
        ctx.beginPath();
        ctx.arc(X, Y, CELL_WIDTH / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = PLAYER_COLOR;
        ctx.fill();
        ctx.closePath();
        if (isTurboActive) {
            this.props.dispatch(slowDown());
            while(turboscores > 0) {
                this.props.dispatch(setPlayerPosition(map_));
                this.props.dispatch(setPlayerDirection()); 
                this.drawPlayer();
                turboscores--;
                this.getDistances();
            }
            this.props.dispatch(stopKiller());

        }
    }

    setHunterPosition = (x,y,direction, value = 1) => {
        const { axis, direction_on_axis } = DIRECTION_MAPPING[direction];
        const isX = axis === 'x';
        const isY = axis === 'y';
    
        return {
            x: isX ? x + direction_on_axis * value : x,
            y: isY ? y + direction_on_axis * value : y
        }
    }

    isPlayerHere = (hunter) => {
        const { player } = this.props;
        const sameX = player.x === hunter.x;
        const sameY =  player.y === hunter.y;
    
        if (sameX) {
            return { y: player.y, x: player.x }
        } else if (sameY) {
            return { y: player.y, x: player.x }
        } else return false;
    }

    findFreeCell = (type, hunter) => {
        const { player, map_ } = this.props;
        const IPH = this.isPlayerHere(hunter);
        if (IPH) return IPH
                
        switch(type) {
            case "8xf0y6ziyjabvozdd253nd":
                const startX = 1, startY = 1;
                const stopX = map_[0].length - 1, stopY = map_.length - 1;
                for(let y = startY; y < stopY; y++) {
                    for (let x = startX; x < stopX; x++) {
                        if (map_[y][x] === 1 && !hunter.passedCells.includes(y + '' + x)) {
                            return { y, x };
                        }
                    }
                }
                break;
            case "8xf0y6ziyjabvozdd253n2":
                for(let y = map_.length - 2; y > 1; y--) {
                    for (let x = map_[0].length - 2; x > 1; x--) {
                        if (map_[y][x] === 1 && !hunter.passedCells.includes(y + '' + x)) {
                            return { y, x };
                        }
                    }
                } 
                break;
            case "8xf0y6ziyjabvozdd253n3":
                for (let x = map_[0].length - 2; x > 1; x--) {
                    for(let y = 1; y < map_.length - 1; y++) {
                        if (map_[y][x] === 1 && !hunter.passedCells.includes(y + '' + x)) {
                            return { y, x };
                        }
                    }
                }
            break;
            default:
                return { y: player.y, x: player.x }
        }
    
        
    }

    findPath = (hunterInd, hunter) => {
  
        const FSTART = this.FINDING_GRAPH.grid[hunter.y][hunter.x];
        const { y, x } = this.findFreeCell(hunterInd, hunter);
        const FEND = this.FINDING_GRAPH.grid[y][x];
        const PATH = astar.search(this.FINDING_GRAPH, FSTART, FEND).map(item => ({ y: item.x, x: item.y}));
        
        return PATH.map((item,i) => {
            if (i === 0) {
                if (item.x > hunter.x) return RIGHT;
                else if (item.x < hunter.x) return LEFT;
                else if (item.y > hunter.y) return DOWN;
                else if (item.y < hunter.y) return UP;
            } else {
                if (item.x > PATH[i-1].x) return RIGHT;
                else if (item.x < PATH[i-1].x) return LEFT;
                else if (item.y > PATH[i-1].y) return DOWN;
                else if (item.y < PATH[i-1].y) return UP;
            }
        });
    }

    drawHunter = (hunterInd) => {
        let { hunters } = this.props;
        const hunter1 = hunters[hunterInd];

        const ctx = this.refs.canvas.getContext('2d');

        if (!hunter1.currentStep) {
            const path = this.findPath(hunterInd, hunter1);
            this.props.dispatch(setPath(hunterInd,path));
            this.props.dispatch(setHunterDirection(hunterInd));
        }

        let { hunters: huntersCopy, game } = this.props;
        const hunter = huntersCopy[hunterInd];
    
        let X = hunter.x * CELL_WIDTH;
        let Y = hunter.y * CELL_WIDTH;
    
        if (!game.pause) {
            const {x, y} = hunter.currentStep ? this.setHunterPosition(X,Y, hunter.currentStep, game.timer) : { x: X, y: Y};
    
            X = x;
            Y = y;

            // store.dispatch({ type: SAVE_HUNTER, x, y});
           
        } 
        // else {
        //     if (game.index < hunter.history.length) {
        //         const { x: x1, y: y1 } = hunter.history[game.index];
        //         const x = x1 / CELL_WIDTH;
        //         const y = y1 / CELL_WIDTH;
        //         if (Number.isInteger(x) && Number.isInteger(y)) store.dispatch({ type: SET_HUNTER_POSITION_FROM_HISTORY, x, y})
                
        //         X = x1;
        //         Y = y1;
        //     }
            
        // }
    
        ctx.beginPath();
        ctx.fillStyle = HUNTER_COLOR;
        ctx.rect(X, Y, CELL_WIDTH, CELL_WIDTH);
        ctx.fill();
        ctx.closePath();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }

    componentWillUnmount() {
        this.stop()
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
        this.props.dispatch(start())
    }

    stop = () => {
        const ctx = this.refs.canvas.getContext('2d');
        cancelAnimationFrame(this.frameId)
        ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }

    animate = () => {
        const { game, map_, hunters } = this.props;
        const hunterIndexies = Object.keys(hunters);

        const { pause, process } = game;
        this.frameId = window.requestAnimationFrame(this.animate)
        this.frame++;

        if (this.frame % FPS === 0) {
            if (process) {
                if (!pause) {
                    if (game.timer === 0) {
                        hunterIndexies.forEach(hunterInd => {
                            hunters[hunterInd].alive && this.props.dispatch(setHunterPosition(hunterInd));
                            hunters[hunterInd].alive && this.props.dispatch(setHunterDirection(hunterInd));
                        });
                        this.props.dispatch(setPlayerPosition(map_));
                        this.props.dispatch(setPlayerDirection());
                    }
                }
    
                this.clearWindow();
                this.drawMap();
                this.drawPlayer();
                hunterIndexies.forEach(hunterInd => {
                    hunters[hunterInd].alive && this.drawHunter(hunterInd);
                });
                this.props.dispatch(setTimer());
                this.getDistances()
            }
        }
    }

    clickHandle = () => {
        const self = this;
        this.timer = setTimeout(function () {
            // if (!self.clicks) self.props.dispatch(pause())
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
            //this.props.dispatch(start());
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
            }}><canvas ref="canvas" onPointerDown={this.pointerDown} onPointerMove={this.pointerMove} onClick={this.clickHandle} onDoubleClick={this.dblClickHandle} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} style={{ width: '100%', height: '100vh' }} /></div>
        );
    }
}

function mapStateToProps(state) {
    return {
        map_: getMapSelector(state),
        user: getUserSelector(state),
        users: getUsersSelector(state),
        player: getPlayerSelector(state),
        hunter1: getHunter1Selector(state),
        hunter2: getHunter2Selector(state),
        hunter3: getHunter3Selector(state),
        hunters: getHunterSelector(state),
        game: getGameSelector(state)
    }
}

export default connect(mapStateToProps)(Canvas)