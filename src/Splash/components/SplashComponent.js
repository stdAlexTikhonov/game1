import React from 'react'
import { SplashStyle, SplashText } from '../styles'
import { TEXT_FOR_SPLASH } from '../constants'

const SplashComponent = () => {
    return <div style={SplashStyle}>
        <div style={SplashText}>{TEXT_FOR_SPLASH}</div>
    </div>;
}

export default SplashComponent;