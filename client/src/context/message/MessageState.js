import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageContext from './messageContext';
import messageReducer from './messageReducer';
import { SET_MESSAGE, REMOVE_MESSAGE } from '../types';

const MessageState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(messageReducer, initialState);

    // Set Message
    const setMessage = (msg, type, timeout = 5000) => {
        const id = uuidv4();
        dispatch({
            type: SET_MESSAGE,
            payload: { msg, type, id },
        });

        setTimeout(() => dispatch({ type: REMOVE_MESSAGE, payload: id }), timeout);
    };

    return (
        <MessageContext.Provider
            value={{
                messages: state,
                setMessage,
            }}>
            {props.children}
        </MessageContext.Provider>
    );
};

export default MessageState;
