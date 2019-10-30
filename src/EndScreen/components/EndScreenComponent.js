import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setMap } from '../../actions/game'
import { getIndexSelector } from '../../selectors/test'
import {
    endScreenStyle,
    innerBlockStyle,
    titleStyle,
    btnStyle,
    exitBtn
} from '../styles'


class EndScreenComponent extends Component {

    handleClick = () => this.props.dispatch(setMap(this.props.index));

    render() {
        console.log(this.props)
        return (
            <div style={endScreenStyle}>
                <div style={innerBlockStyle}>
                    <div style={titleStyle}>YOU DEAD</div>
                    <Link to='/game' style={btnStyle} onClick={this.handleClick}>Retry</Link>
                    <Link to='/' style={exitBtn}>Main Menu</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        index: getIndexSelector(state)
    }
}

export default connect(mapStateToProps)(EndScreenComponent);