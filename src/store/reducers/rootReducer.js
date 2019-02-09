import * as actionTypes from '../constants/actionTypes'

const initialState = {
    rootFetching: false,
    stationFetching: false,
    error: null,
    networks: [],
    stations: [],
    selectedNetwork: null,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.API_CALL_NETWORKS:
            return { ...state, rootFetching: true, error: null };
        case actionTypes.API_CALL_NETWORKS_SUCCESS:
            return {
                ...state,
                rootFetching: true,
                networks: action.networks,
                stations: action.stations,
                selectedNetwork: action.selectedNetwork,
            };
        case actionTypes.API_CALL_NETWORKS_FAIL:
            return { ...state, rootFetching: false, networks: [], error: action.error };
        case actionTypes.API_CALL_STATIONS:
            return { ...state, stationFetching: true, error: null };
        case actionTypes.API_CALL_STATIONS_SUCCESS:
            return { ...state, stationFetching: false, stations: action.stations, selectedNetwork: action.selectedNetwork };
        case actionTypes.API_CALL_STATIONS_FAIL:
            return { ...state, stationFetching: false, stations: [], error: action.error };
        default:
            return state;
    }
}

export default rootReducer