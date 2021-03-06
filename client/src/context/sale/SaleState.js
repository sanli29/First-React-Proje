import React, { useReducer } from 'react';
import axios from 'axios';

import SaleContext from './saleContext';
import saleReducer from './saleReducer';
import {
    CLEAR_ERRORS, ERROR_SALES, GET_SALES
} from '../types';

const SaleState = props => {
    const initialState = {
        sales: null,
        err: null,
        loading: true,
        message: null
    };

    const [state, dispatch] = useReducer(saleReducer, initialState);

    // Get Sales
    const GetSales = async (query) => {

        try {
            const res = await axios.get(`/api/sales?${query}`);


            dispatch({
                type: GET_SALES,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: ERROR_SALES,
                payload: err.response.data.msg
            });
        }
    };
    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <SaleContext.Provider
            value={{
                sales: state.sales,
                err: state.err,
                message: state.message,
                clearErrors,
                GetSales,
                loading: state.loading,
            }}
        >
            {props.children}
        </SaleContext.Provider>
    );
};

export default SaleState;
