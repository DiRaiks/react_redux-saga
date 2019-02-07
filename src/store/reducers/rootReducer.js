import * as actionTypes from '../constants/actionTypes'

const initialState = {
    fetching: false,
    error: null,
    file: null
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.API_CALL_REQUEST:
            return {...state, fetching: true, error: null};
        case actionTypes.API_CALL_SUCCESS:
            return {...state, fetching: false, file: action.file};
        case actionTypes.API_CALL_FAIL:
            return {...state, fetching: false, file: null, error: action.error};
        default:
            return state;
    }
}

export default rootReducer