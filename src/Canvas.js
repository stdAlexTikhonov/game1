import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FPS, CELL_WIDTH, WALL_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH, BACKGROUND } from './utils/constants'
import { setTimer, pause } from './actions/game'
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
        this.timer = null
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
            if (game.pause) alert('success');
            this.clearWindow();
            this.drawMap();
            this.props.dispatch(setTimer());
        }
    }

    clickHandle = () => {
        // const { clicks } = this.state;
        // this.setState({ clicks: clicks + 1})
        // const self = this;
        // if (clicks == 1) {
        //     setTimeout(function(){
        //       if(clicks == 1) {
        //           self.props.dispatch(pause());
        //         //   slider.value = 0;
        //         //   container.appendChild(slider);
        //       } else {
        //           self.props.dispatch(turboBoost());
        //       }
        //       console.log(clicks)
        //       this.clicks = 0;
        //     }, 300);
      
        //   }
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



    render() {

        return (
            <div style={{
                height: '100vh',
                width: '100%',
                background: 'red'
            }}><canvas ref="canvas" onClick={this.clickHandle} onDoubleClick={this.dblClickHandle} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} style={{ width: '100%', height: '100vh'}} /></div>
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