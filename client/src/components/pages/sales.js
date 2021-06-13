import React, { useState, useEffect, useContext } from 'react';
import MTable from '../ui/MTable';
import { makeStyles } from '@material-ui/core/styles'

import AlertContext from '../../context/alert/alertContext';
import SaleContext from '../../context/sale/saleContext';

const useStyles = makeStyles(theme => ({
    page: {
        padding: '1rem'
    }
}));

export default function Sales() {

    const classes = useStyles();
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const saleContext = useContext(SaleContext);
    const { err, sales, clearErrors, GetSales, loading } = saleContext;

    const [columns, setColumns] = useState([]);
    useEffect(() => {

        GetSales()

    }, [])

    const salesTableProps = {
        title: 'Sales',
        options: {
            actionsColumnIndex: -1,
            exportButton: true,
            filtering: true,
            grouping: true,
            selection: true,
            sorting: true
        },
        onSelectionChange: rows => {
            alert('You selected ' + rows.length + ' rows');
        }
    };

    return (
        <div>
            <MTable data={sales ? sales : []} columns={[
                {
                    title: 'PO #',
                    field: 'PO #'
                },
                {
                    title: 'External ID',
                    field: 'External ID'
                },
                {
                    title: 'Title',
                    field: 'Title',
                    cellStyle: {
                        minWidth: '35rem',
                    },
                    headerStyle: {
                        minWidth: '35rem',
                    }
                },
                {
                    title: 'ASIN',
                    field: 'ASIN'
                },
                {
                    title: 'Model #',
                    field: 'Model #'
                },
                {
                    title: 'Freight Term',
                    field: 'Freight Term'
                },
                {
                    title: 'Qty',
                    field: 'Qty'
                },
                {
                    title: 'Unit Cost',
                    field: 'Unit Cost'
                },
                {
                    title: 'Amount',
                    field: 'Amount'
                },
                {
                    title: 'Shortage quantity',
                    field: 'Shortage quantity'
                },
                {
                    title: 'Amount shortage',
                    field: 'Amount shortage'
                },
                {
                    title: 'Last received date',
                    field: 'Last received date'
                },
                {
                    title: 'ASIN received',
                    field: 'ASIN received'
                },
                {
                    title: 'Quantity received',
                    field: 'Quantity received'
                },
                {
                    title: 'ASIN received',
                    field: 'ASIN received'
                },
                {
                    title: 'Unit cost',
                    field: 'Unit cost'
                },
                {
                    title: 'Amount received',
                    field: 'Amount received'
                }
            ]} tprops={salesTableProps} />
        </div>
    )
}
