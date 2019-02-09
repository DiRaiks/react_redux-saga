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

    createRenderCompanysList() {
        return this.props.networks.map(network =>
            <li
                key={ network.id }
                className={ network.id === this.props.selectedNetwork ? 'selectedCompany' : '' }
                onClick={() => this.changeCompany(network.id)}
            >
                { this.checkCompany(network.company) } ({ network.country } { network.city })
            </li>
        )
    }

    createRenderStationsList() {
         return this.props.stations.map(station =>
             <li
                 key={ station.id }
                 className={ station.free_bikes > 0 ? 'stationWithBicycles' : {} }
             >
                 (Free bikes: { station.free_bikes }) { station.name }
             </li>
         )
    }

    render() {
        let companys = this.createRenderCompanysList()
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