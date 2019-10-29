import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared' 
import Canvas from './Canvas'
import MenuComponent from './MenuScreen/components/MenuComponent'
import SplashComponent from './Splash/components/SplashComponent'
import { Route } from 'react-router-dom'


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
      <Route exact path='/' render={() => (
        showSplash ? <SplashComponent /> : <MenuComponent />
      )} />
      <Route path='/game' component={Canvas} />
    </div>
    );
  }
}

export default connect()(App);
