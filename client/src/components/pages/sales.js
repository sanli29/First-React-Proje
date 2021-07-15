import React, { useState, useEffect, useContext } from 'react';
import MTable from '../ui/MTable';

import { makeStyles } from '@material-ui/core/styles'

import AlertContext from '../../context/alert/alertContext';
import SaleContext from '../../context/sale/saleContext';
import { MuiThemeProvider, createMuiTheme, FormControlLabel, Switch } from '@material-ui/core'

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

    const [selectedSales, setSelectedSales] = useState([]);



    const salesTableProps = {
        title: 'Sales',
        options: {
            actionsColumnIndex: -1,
            filtering: true,
            grouping: true,
            selection: true,
            sorting: true,
            columnsButton: true,
        },
        onSelectionChange: rows => {
            console.log(this);
            setSelectedSales(rows);
        },



    };


    const [preferDarkMode, setPreferDarkMode] = useState(() => {
        const mode = localStorage.getItem('_tableDarkMode')
        return mode === "true" || false
    })

    const theme = createMuiTheme({
        palette: {
            type: preferDarkMode ? 'dark' : 'light'
        }
    })

    const handleDarkModeChange = () => {
        setPreferDarkMode(!preferDarkMode)
        localStorage.setItem('_tableDarkMode', !preferDarkMode)
    }
    const [sumQty, setSumQty] = useState(0);
    const [sumReceivedQty, setSumReceivedQty] = useState(0);
    const [sumUnitCost, setSumUnitCost] = useState(0);
    const [sumReceivedUnitCost, setSumReceivedUnitCost] = useState(0);
    const [sumAmount, setSumAmount] = useState(0);
    const [sumReceivedAmount, setSumReceivedAmount] = useState(0);


    function FunctionClick() {

        setSumQty(0);
        setSumReceivedQty(0);

        setSumUnitCost(0);
        setSumReceivedUnitCost(0);

        setSumAmount(0);
        setSumReceivedAmount(0);

        for (let sale of selectedSales) {
            setSumQty(sumQty + parseFloat(sale.Qty));
            setSumReceivedQty(sumReceivedQty + parseFloat(sale['Quantity received']));
            setSumUnitCost(sumUnitCost + parseFloat(sale['Unit Cost'].split('EUR')[1].replace(',', '.')));
            setSumReceivedUnitCost(sumReceivedUnitCost + parseFloat(sale['Unit cost'].replace(' EUR', "").replace(',', '.')));
            setSumAmount(sumAmount + parseFloat(sale['Amount'].split('EUR')[1].replace(',', '.')));
            setSumReceivedAmount(sumReceivedAmount + parseFloat(sale['Amount received'].replace(' EUR', "").replace(',', '.')));
        }
    }

    return (
        <div>
            <FormControlLabel
                value="top"
                control={<Switch color="primary" checked={preferDarkMode} />}
                onChange={handleDarkModeChange}
                label="Dark Mode"
                labelPlacement="top"
            />
            <MuiThemeProvider theme={theme}>
                <MTable data={sales ? sales : []} selectedData={selectedSales} columns={[
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
            </MuiThemeProvider>

            <button className="button button1" onClick={FunctionClick}>Calculate</button>
            <h1>Sum Qty is {sumQty}</h1>
            <h1>Sum ReceivedQty is {sumReceivedQty}</h1>
            <h1>Sum UnitCost is {sumUnitCost}</h1>
            <h1>Sum ReceivedUnitCost is {sumReceivedUnitCost}</h1>
            <h1>Sum Amount is {sumAmount}</h1>
            <h1>Sum ReceivedAmount is {sumReceivedAmount}</h1>
        </div>

    )
}
