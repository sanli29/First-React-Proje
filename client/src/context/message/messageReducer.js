import { SET_MESSAGE, REMOVE_MESSAGE } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return [...state, action.payload];
        case REMOVE_MESSAGE:
            return state.filter(messeage => messeage.id !== action.payload);
        default:
            return state;
    }
};
