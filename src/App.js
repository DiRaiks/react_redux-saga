import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

import { Side } from './components'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="appHeader" />
        <div className="appContent">
            <Side />
            <Side />
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({ ...state })
export default connect(mapState)(App)