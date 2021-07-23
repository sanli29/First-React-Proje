import React, { useState, useEffect, useCallback, useContext } from 'react';
import MTable from '../ui/MTable';
import queryString from 'query-string';
import qs from 'qs';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import SaleContext from '../../context/sale/saleContext';
import { TablePagination, Grid, Typography, Divider, MuiThemeProvider, createMuiTheme, FormControlLabel, Switch } from '@material-ui/core';

import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';




const useStyles = makeStyles(theme => ({
  page: {
    padding: '1rem'
  },
  datePickers: {
    padding: '5px'
  }
}));

export default function Sales() {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const saleContext = useContext(SaleContext);
  const { err, sales, clearErrors, GetSales, loading } = saleContext;
  const { search } = useLocation();
  const urlQuery = new URLSearchParams(search);
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date('2014-08-18T21:11:54'));
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());

  const canBeObject = (value) => {
    try {
      let val = JSON.parse(value);
      return val;
    } catch (err) {
      return false;
    }
  }

  const parseParams = (querystring) => {

    // parse query string
    const params = new URLSearchParams(querystring);

    const obj = {};

    // iterate over all keys
    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        obj[key] = params.getAll(key);
      } else {
        obj[key] = params.get(key);
      }
    }

    return obj;
  };

  const [columns, setColumns] = useState([]);
  useEffect(() => {


    let query = {
      find: {
        'Last received date': {
          $gte: selectedDateFrom.toISOString(),
          $lte: selectedDateTo.toISOString(),
          type: 'Date',
        }
      },
    };
    const qsg = qs.stringify(query);
    GetSales(qsg);
    console.log(qsg);

  }, [selectedDateFrom, selectedDateTo]);

  const [selectedSales, setSelectedSales] = useState([]);

  const salesTableProps = {
    title: (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              className={classes.datePickers}
              margin="normal"
              id="date-picker-dialog"
              label="Start Date"
              format="dd/MM/yyyy"
              value={selectedDateFrom}
              onChange={(date) => {
                testingDates(date, 'From');
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              className={classes.datePickers}
              margin="normal"
              id="date-picker-dialog"
              label="End Date"
              format="dd/MM/yyyy"
              value={selectedDateTo}
              onChange={(date) => {
                testingDates(date, 'To');
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>),
    options: {
      actionsColumnIndex: -1,
      filtering: true,
      grouping: true,
      selection: true,
      sorting: true,
      columnsButton: true
    },
    components: {
      Pagination: (props) => <>
        <Grid container style={{ padding: 15 }}>
          <Grid sm={2} item align="center"><Typography variant="subtitle2" ><b>Qty : {summary.qty}</b></Typography></Grid>
          <Grid sm={2} item align="center"><Typography variant="subtitle2" ><b>ReceivedQty : {summary.receivedQty}</b></Typography></Grid>
          <Grid sm={2} item align="center"><Typography variant="subtitle2" ><b>UnitCost : {summary.unitCost}</b></Typography></Grid>
          <Grid sm={2} item align="center"><Typography variant="subtitle2" ><b>ReceivedUnitCost : {summary.receivedUnitCost}</b></Typography></Grid>
          <Grid sm={2} item align="center"><Typography variant="subtitle2" ><b>Amount : {summary.amount}</b></Typography></Grid>
          <Grid sm={2} item align="center"><Typography variant="subtitle2" ><b>ReceivedAmount : {summary.receivedAmount}</b></Typography></Grid>
        </Grid>
        <Divider />
        <TablePagination {...props} />
      </>
    },
    onSelectionChange: rows => {
      console.log(this);
      setSelectedSales(rows);
    }
  };

  const [preferDarkMode, setPreferDarkMode] = useState(() => {
    const mode = localStorage.getItem('_tableDarkMode');
    return mode === 'true' || false;
  });

  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? 'dark' : 'light'
    }
  });

  const handleDarkModeChange = () => {
    setPreferDarkMode(!preferDarkMode);
    localStorage.setItem('_tableDarkMode', !preferDarkMode);
  };

  const [summary, setSummary] = useState({
    qty: 0,
    receivedQty: 0,
    unitCost: 0,
    receivedUnitCost: 0,
    amount: 0,
    receivedAmount: 0
  });

  const resetSummary = () => {
    setSummary(summary => ({
      ...summary,
      qty: 0,
      receivedQty: 0,
      unitCost: 0,
      receivedUnitCost: 0,
      amount: 0,
      receivedAmount: 0
    }));
  };

  const calcSummary = () => {
    for (let sale of selectedSales) {
      setSummary(summary => ({
        qty: summary.qty + parseFloat(sale.Qty),
        receivedQty: summary.receivedQty + parseFloat(sale['Quantity received']),
        unitCost:
          summary.unitCost + parseFloat(sale['Unit Cost'].split('EUR')[1].replace(',', '.')),
        receivedUnitCost:
          summary.receivedUnitCost +
          parseFloat(sale['Unit cost'].replace(' EUR', '').replace(',', '.')),
        amount: summary.amount + parseFloat(sale['Amount'].split('EUR')[1].replace(',', '.')),
        receivedAmount:
          summary.receivedAmount +
          parseFloat(sale['Amount received'].replace(' EUR', '').replace(',', '.'))
      }));
    }
  };

  const summarize = () => {
    resetSummary();
    calcSummary();
  };

  const testingDates = (date, type) => {


    if (type == 'From') {
      if (date.getTime() < selectedDateTo.getTime()) {
        setSelectedDateFrom(date);
      }
    }
    else if (type == 'To') {
      if (date.getTime() > selectedDateFrom.getTime()) {
        setSelectedDateTo(date);
      }
    }
  };


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
        <MTable
          data={sales ? sales : []}
          selectedData={selectedSales}
          columns={[
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
                minWidth: '35rem'
              },
              headerStyle: {
                minWidth: '35rem'
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
          ]}
          tprops={salesTableProps}
        />
      </MuiThemeProvider>

      <button className="button button1" onClick={summarize}>
        Calculate
      </button>


    </div >
  );
}
