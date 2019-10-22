import React, { Component } from 'react'

const height = window.innerHeight,
width = document.body.clientWidth

class Canvas extends Component {
    componentDidMount() {
        this.iter = 0;
        this.start();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, width, height);
    }

    componentWillUnmount(){
        this.stop()
    }

    start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
        this.updateCanvas();
    }

    stop = () => {
        const ctx = this.refs.canvas.getContext('2d');
        cancelAnimationFrame(this.frameId)
        ctx.clearRect(0,0, width, height);
    }

    animate = () => {
       this.frameId = window.requestAnimationFrame(this.animate)
       this.iter++;
       if (this.iter > 100) this.stop();
    }

    render() {


        return (
            <div style={{
                height: '100vh',
                width: '100%',
                background: 'red'
            }}><canvas ref="canvas" width={width} height={height} /></div>
        );
    }
}

export default Canvas