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
    });
}

function getStations(id) {
    return axios({
        method: 'get',
        url: `https://api.citybik.es/v2/networks/${ id }`
    });
}

function* workerNetworksSaga() {
    try {
        const response = yield call(getNetworks);
        // const networks = filterBicycles(response.data.networks)
        const networks = filterNetworks(response.data.networks)

        yield put({
            type: actionTypes.API_CALL_NETWORKS_SUCCESS,
            networks,
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
        const response = yield call(() => getStations(action.id));
        // const networks = filterBicycles(response.data.networks)
        const bicycles = response.data.network

        yield put({
            type: actionTypes.API_CALL_BICYCLES_SUCCESS,
            bicycles,
        })
    } catch(error) {
        console.log(error)
        yield put({
            type: actionTypes.API_CALL_BICYCLES_FAIL,
            error
        })
    }
}

function filteredStantion(stantions) {

}

function filterNetworks(networks) {

    // let networks = bicycles.map(item => {
    //     return item.company
    // })
    //     .reduce(function(a, b){
    //     return a.concat(b);
    // }, []);
    // return unique(networks)

    // let filteredNetworks = bicycles.reduce((arr, bicycle) => {
    //     if (arr[ bicycle.location.country ]) {
    //         arr[ bicycle.location.country ].push(bicycle)
    //         return arr
    //     }
    //     arr[ bicycle.location.country ] = [ bicycle ]
    //     return arr
    // }, {})
    // return filteredNetworks

    let filteredNetworks = networks.reduce((arr, network) => {
        if (arr[ network.id]) return arr
        arr[ network.id ] = network
        return arr
    }, {})
    console.log(filteredNetworks)
    return filteredNetworks

    // let cities = citiesArray.reduce((acc, city) => {
    //     if (acc.map[city.VALUE]) // если данный город уже был
    //         return acc; // ничего не делаем, возвращаем уже собранное
    //
    //     acc.map[city.VALUE] = true; // помечаем город, как обработанный
    //     acc.cities.push(city); // добавляем объект в массив городов
    //     return acc; // возвращаем собранное
    // }, {
    //     map: {}, // здесь будут отмечаться обработанные города
    //     cities: [] // здесь конечный массив уникальных городов
    // })
    //     .cities; // получаем конечный массив
}

function unique(arr) {
    let obj = {}
    arr.forEach(item => obj[ item ] = true)
    return Object.keys(obj)
}