import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionTypes from './store/constants/actionTypes';
import './App.css'

import { Side } from './components'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedCompany: null,
            bicyclesArray: [],
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: actionTypes.API_CALL_NETWORKS })
    }

    static getDerivedStateFromProps(props, state) {
        console.log('get derived', props.networks, props, state, )
        if (props.networks && !state.selectedCompany) {
            console.log('get derived if')
            let firstEl
            for (let key in props.networks) {
                firstEl = key
                break
            }
            return {
                selectedCompany: firstEl,
                bicyclesArray: [],
            }
        }
        return null
    }

    changeCompany = (key) => {
        this.setState({
            selectedCompany: key,
        })
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
                    style={ key === this.state.selectedCompany ? { background: 'green' } : {} }
                    onClick={() => this.changeCompany(key)}
                >
                    { this.checkCompany(networks[ key ].company) } ({ networks[ key ].location.country } { networks[ key ].location.city })
                </li>
            )
        }
        return companys
    }

    createRenderStationsList(stations) {
         return this.props.bicycles.stations && this.props.bicycles.stations.map(item =>
             <li style={item.free_bikes > 0 ? { background: 'red' } : {}}>(Free bikes: { item.free_bikes }) { item.name }</li>
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
                    <Side header={ 'NetWorks' } companys={ companys } />
                    <Side header={ 'Bicycles' } companys={ stations }/>
                </div>
            </div>
        );
    }
}


const mapState = (state) => ({ ...state })
export default connect(mapState)(App)