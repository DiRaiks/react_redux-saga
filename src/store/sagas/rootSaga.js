import { takeEvery, call, put } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import axios from 'axios'

//watcher
export function* watcherSaga() {
    yield takeEvery(actionTypes.API_CALL_NETWORKS, workerNetworksSaga)
    yield takeEvery(actionTypes.API_CALL_BICYCLES, workerStationsSaga)
}

function getNetworks() {
    return axios({
        method: 'get',
        url: 'https://api.citybik.es/v2/networks?fields=id,company,location'
    }).then(response => response.data.networks);
}

function getStations(id) {
    return axios({
        method: 'get',
        url: `https://api.citybik.es/v2/networks/${ id }`
    }).then(response => response.data.network.stations);
}

function* workerNetworksSaga() {
    try {
        const networks = yield call(getNetworks);
        const filteredNetworks = filterNetworks(networks)
        const selectedNetwork = getFirstNetworkId(filteredNetworks)
        const stations = yield call(getStations, selectedNetwork)

        yield put({
            type: actionTypes.API_CALL_NETWORKS_SUCCESS,
            networks: filteredNetworks,
            stations,
            selectedNetwork,
        })
    } catch(error) {
        yield put({
            type: actionTypes.API_CALL_NETWORKS_FAIL,
            error
        })
    }
}

function* workerStationsSaga(action) {
    console.log('ACTION', action)
    try {
        const selectedNetwork = action.id
        const stations = yield call(() => getStations(selectedNetwork));

        yield put({
            type: actionTypes.API_CALL_BICYCLES_SUCCESS,
            stations,
            selectedNetwork,
        })
    } catch(error) {
        console.log(error)
        yield put({
            type: actionTypes.API_CALL_BICYCLES_FAIL,
            error
        })
    }
}

function getFirstNetworkId(networks) {
    let firstEl
    for (let key in networks) {
        firstEl = key
        break
    }
    return firstEl
}

function filterNetworks(networks) {
    let filteredNetworks = networks.reduce((arr, network) => {
        if (arr[ network.id]) return arr
        arr[ network.id ] = network
        return arr
    }, {})
    return filteredNetworks
}

function unique(arr) {
    let obj = {}
    arr.forEach(item => obj[ item ] = true)
    return Object.keys(obj)
}