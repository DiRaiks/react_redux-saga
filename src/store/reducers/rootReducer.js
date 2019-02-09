import * as actionTypes from '../constants/actionTypes'

const initialState = {
    fetching: false,
    error: null,
    networks: [],
    stations: [],
    selectedNetwork: null,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.API_CALL_NETWORKS:
            return { ...state, fetching: true, error: null };
        case actionTypes.API_CALL_NETWORKS_SUCCESS:
            return {
                ...state,
                fetching: false,
                networks: action.networks,
                stations: action.stations,
                selectedNetwork: action.selectedNetwork,
            };
        case actionTypes.API_CALL_NETWORKS_FAIL:
            return { ...state, fetching: false, networks: null, error: action.error };
        case actionTypes.API_CALL_BICYCLES:
            return { ...state, fetching: true, error: null };
        case actionTypes.API_CALL_BICYCLES_SUCCESS:
            return { ...state, fetching: false, stations: action.stations, selectedNetwork: action.selectedNetwork };
        case actionTypes.API_CALL_BICYCLES_FAIL:
            return { ...state, fetching: false, stations: null, error: action.error };
        default:
            return state;
    }
}

export default rootReducer