import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    endScreenStyle,
    innerBlockStyle,
    titleStyle,
    btnStyle,
    exitBtn
} from '../styles'

class EndScreenComponent extends Component {
    render() {
        return (
            <div style={endScreenStyle}>
                <div style={innerBlockStyle}>
                    <div style={titleStyle}>YOU DEAD</div>
                    <Link to='/game' style={btnStyle}>Retry</Link>
                    <Link to='/' style={exitBtn}>Main Menu</Link>
                </div>
            </div>
        )
    }
}

export default EndScreenComponent;