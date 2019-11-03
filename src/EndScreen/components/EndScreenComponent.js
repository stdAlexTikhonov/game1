import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles.css'
import { setMap } from '../../actions/game'
import { getIndexSelector } from '../../selectors/test'



class EndScreenComponent extends Component {

    handleClick = () => this.props.dispatch(setMap(this.props.index));

    render() {
        const { flag } = this.props;
        return (
            <div className={flag ? 'endScreenStyle opacity0' : 'endScreenStyle'}>
                <div className={'innerBlockStyle'}>
                    <div className={'titleStyle'}>YOU DEAD</div>
                    {!flag && <Link to='/game' className={'btnStyle'} onClick={this.handleClick}>Retry</Link> }
                    {!flag && <Link to='/' className={'btnStyle exitBtn'}>Main Menu</Link> }
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