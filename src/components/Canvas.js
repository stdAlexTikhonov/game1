import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FPS, CELL_WIDTH, WALL_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH, BACKGROUND, MAP_ } from '../utils/constants'

const height = window.innerHeight,
width = document.body.clientWidth

class Canvas extends Component {
    componentDidMount() {
        this.frame = 0;
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
    
        MAP_.forEach((item,i) => {
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
        this.frameId = window.requestAnimationFrame(this.animate)
        this.frame++;

        if (this.frame % FPS === 0) {
            this.clearWindow();
            this.drawMap();
        }
    }

    render() {
        console.log(this.props)

        return (
            <div style={{
                height: '100vh',
                width: '100%',
                background: 'red'
            }}><canvas ref="canvas" width={WINDOW_WIDTH} height={WINDOW_HEIGHT} style={{ width: '100%', height: '100vh'}} /></div>
        );
    }
}

function mapStateToProps (state) {
    return state
}

export default connect(mapStateToProps)(Canvas)