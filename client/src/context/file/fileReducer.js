import {
    IMPORT_FILE,
    IMPORT_SUCCESS,
    IMPORT_FAIL
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case IMPORT_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            };
        case IMPORT_SUCCESS:
            return {
                ...state,
                files: [...state.files, action.payload]
            };
        case IMPORT_FAIL:
            return {
                ...state,
                err: action.payload
            };
    }
};