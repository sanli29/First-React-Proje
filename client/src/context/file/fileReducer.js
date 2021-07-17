import {
    IMPORT_FILE,
    IMPORT_SUCCESS,
    IMPORT_FAIL,
    CLEAR_ERRORS,
    CLEAR_MESSAGES
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
                file: action.payload,
                message: { type: 'success', content: 'Imported successfully.' }
            };
        case IMPORT_FAIL:
            return {
                ...state,
                err: action.payload,
                message: { type: 'error', content: 'There\'s an error while importing: ' + action.payload }
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                err: null
            };
        case CLEAR_MESSAGES:
            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
};