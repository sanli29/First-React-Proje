import {
    CLEAR_ERRORS, ERROR_SALES, GET_SALES
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ERROR_SALES:
            return {
                ...state,
                loading: false,
                err: action.payload
            }
        case GET_SALES:
            return {
                ...state,
                loading: false,
                sales: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                err: null
            };
        default:
            return state;
    }
};