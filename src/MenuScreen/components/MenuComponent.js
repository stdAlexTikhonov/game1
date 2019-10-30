import React, {Component} from 'react';
import { MenuScreenStyle, MenuCardStyle } from '../styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getMapsSelector} from '../../selectors/test';
import { setMap, setIndex } from '../../actions/game';

class MenuComponent extends Component {

    handleClick = (i) => { 
        this.props.dispatch(setMap(i));
        this.props.dispatch(setIndex(i));
    };
    
    render() {
        
        return(<div style={MenuScreenStyle}>
            <div style={{ textAlign: 'center', borderBottom: "2px solid white"}}>menu</div>
            <div style={{ display: 'flex', paddingTop: '20px', flexWrap: 'wrap', justifyContent: 'space-around', flexGrow: 1, minWidth: '100%'}}>
                {
                    this.props.maps.map((item,i) => <Link to="/game" onClick={() => this.handleClick(i)} style={MenuCardStyle}></Link>)
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '2px solid white'}}>
                <div>Options</div>
                <div>Exit</div>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        maps: getMapsSelector(state),
    }
}

export default connect(mapStateToProps)(MenuComponent);