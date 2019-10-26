import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared' 
import Canvas from './Canvas'
import SplashComponent from './Splash/components/SplashComponent'


class App extends Component {

  state = {
    showSplash: true
  }

  hideSplash = () => this.setState({ showSplash: false })

  componentDidMount() {
    this.props.dispatch(handleInitialData())
    .then(() => this.hideSplash())
  }

  render() {
    const { showSplash } = this.state;
    return (<div>
      {showSplash ? <SplashComponent /> : <Canvas />}
    </div>
    );
  }
}

export default connect()(App);
