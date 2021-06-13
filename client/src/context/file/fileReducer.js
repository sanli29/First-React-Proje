import {
    IMPORT_FILE,
    IMPORT_SUCCESS,
    IMPORT_FAIL,
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case IMPORT_FILE:

            console.log('state', state);
            console.log('action.payload', action.payload);
            return {
                ...state,
                file: action.payload
            };
        case IMPORT_SUCCESS:
            console.log('state', state);
            console.log('action.payload', action.payload);
            return {
                ...state,
                file: action.payload
            };
        case IMPORT_FAIL:
            return {
                ...state,
                err: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                err: null
            };
        default:
            return state;
    }
};