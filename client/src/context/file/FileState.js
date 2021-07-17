import React, { useReducer } from 'react';
import axios from 'axios';

import FileContext from './fileContext';
import fileReducer from './fileReducer';
import {
    IMPORT_FILE,
    IMPORT_SUCCESS,
    IMPORT_FAIL,
    CLEAR_ERRORS,
    CLEAR_MESSAGES
} from '../types';

const FileState = props => {
    const initialState = {
        file: null,
        err: null,
        message: null
    };

    const [state, dispatch] = useReducer(fileReducer, initialState);

    // Import File
    const importFile = async fileData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/files', fileData, config);

            console.log('res data->', res.data);

            dispatch({
                type: IMPORT_SUCCESS,
                payload: res.data
            });

        } catch (err) {

            console.log('file importta hata!', err);
            dispatch({
                type: IMPORT_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    // Clear Messages
    const clearMessages = () => dispatch({ type: CLEAR_MESSAGES });

    return (
        <FileContext.Provider
            value={{
                file: state.file,
                err: state.err,
                message: state.message,
                importFile,
                clearErrors,
                clearMessages
            }}
        >
            {props.children}
        </FileContext.Provider>
    );
};

export default FileState;
