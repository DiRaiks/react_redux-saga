import { takeEvery, call, put } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import axios from 'axios'

export function* watcherSaga() {
    yield takeEvery(actionTypes.API_CALL_NETWORKS, workerNetworksSaga)
    yield takeEvery(actionTypes.API_CALL_STATIONS, workerStationsSaga)
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
        const selectedNetwork = filteredNetworks[0].id
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
    try {
        const selectedNetwork = action.id
        const stations = yield call(() => getStations(selectedNetwork));

        yield put({
            type: actionTypes.API_CALL_STATIONS_SUCCESS,
            stations,
            selectedNetwork,
        })
    } catch(error) {
        yield put({
            type: actionTypes.API_CALL_STATIONS_FAIL,
            error
        })
    }
}

function filterNetworks(networks) {
    return networks.map(network => {
        return {
            id: network.id,
            company: network.company,
            country: network.location.country,
            city: network.location.city,
        }
    })
}