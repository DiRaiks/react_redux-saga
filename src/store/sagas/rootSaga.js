import { takeLatest, call, put } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import axios from 'axios'

//watcher
export function* watcherSaga() {
    yield takeLatest(actionTypes.API_CALL_REQUEST, workerSaga)
}

function fetchFile() {
    return axios({
        method: 'get',
        url: 'https://dog.ceo/api/breeds/image/random'
    });
}

function* workerSaga() {
    try {
        const response = yield call(fetchFile);
        const file = response.data.message;

        yield put({
            type: actionTypes.API_CALL_SUCCESS,
            file
        })
    } catch(error) {
        yield put({
            type: actionTypes.API_CALL_FAIL,
            error
        })
    }
}