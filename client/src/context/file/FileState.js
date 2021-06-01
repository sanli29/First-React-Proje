import React, { useReducer } from 'react';
import axios from 'axios';

import FileContext from './fileContext';
import fileReducer from './fileReducer';
import {
    IMPORT_FILE,
    IMPORT_SUCCESS,
    IMPORT_FAIL
} from '../types';

const FileState = props => {
    const initialState = {
        file: null,
        err: null,
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

            dispatch({
                type: IMPORT_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: IMPORT_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    return (
        <FileContext.Provider
            value={{
                file: state.file,
                err: state.err,
                importFile
            }}
        >
            {props.children}
        </FileContext.Provider>
    );
};

export default FileState;
