import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionTypes from './store/constants/actionTypes';
import './App.css'

import { Side } from './components'

class App extends Component {

    componentDidMount() {
        this.props.dispatch({ type: actionTypes.API_CALL_NETWORKS })
    }

    changeCompany = (key) => {
        this.props.dispatch({
            type: actionTypes.API_CALL_BICYCLES,
            id: key,
        })
    }

    checkCompany(company) {
        if (!company) return 'Without Company'
        else if (Array.isArray(company)) return company.join(', ')
        return company
    }

    createRenderCompanysList(networks) {
        let companys= []
        for (let key in networks) {
            companys.push(
                <li
                    key={ key }
                    style={ key === this.props.selectedNetwork ? { background: 'green' } : {} }
                    onClick={() => this.changeCompany(key)}
                >
                    { this.checkCompany(networks[ key ].company) } ({ networks[ key ].location.country } { networks[ key ].location.city })
                </li>
            )
        }
        return companys
    }

    createRenderStationsList() {
         return this.props.stations.map(station =>
             <li key={ station.id } style={station.free_bikes > 0 ? { background: 'red' } : {}}>(Free bikes: { station.free_bikes }) { station.name }</li>
         )
    }

    render() {
        let networks = this.props.networks || {}
        let companys = this.createRenderCompanysList(networks)
        let stations = this.createRenderStationsList()

        return (
            <div className="app">
                <header className="appHeader" />
                <div className="appContent">
                    <Side header={ 'NetWorks' } renderList={ companys } />
                    <Side header={ 'Bicycles' } renderList={ stations }/>
                </div>
            </div>
        );
    }
}


const mapState = (state) => ({ ...state })
export default connect(mapState)(App)