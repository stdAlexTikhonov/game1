import React, {Component} from 'react';
import { MenuScreenStyle, MenuCardStyle } from '../styles';
import { Link } from 'react-router-dom';

class MenuComponent extends Component {
    render() {
        return(<div style={MenuScreenStyle}>
            <div style={{ textAlign: 'center', borderBottom: "2px solid white"}}>menu</div>
            <div style={{ display: 'flex', padding: '20px', flexWrap: 'wrap'}}>
                <Link to="/game" style={MenuCardStyle}></Link>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
                <div style={MenuCardStyle}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '2px solid white'}}>
                <div>Options</div>
                <div>Exit</div>
            </div>
        </div>);
    }
}

export default MenuComponent;