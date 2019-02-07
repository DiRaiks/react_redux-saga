import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

import { Side } from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <Side />
        <Side />
      </div>
    );
  }
}

const mapState = (state) => ({ ...state })
export default connect(mapState)(App)