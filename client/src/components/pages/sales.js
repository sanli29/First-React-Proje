import React, { useState } from 'react';
import MTable from '../ui/MTable';
import { csv } from "csvtojson";
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    page: {
        padding: '1rem'
    }
}));

export default function Sales() {

    const classes = useStyles();
    const theme = useTheme();

    const [items, setItems] = useState([]);
    const [columns, setColumns] = useState([]);

    const readCSV = async (file) => {
        let text = await file.text();
        text = text.replace('Invoice Details', "");
        let rows = text.split('\n');
        rows.shift();
        rows.shift();

        let txt = '';

        for (let row of rows) {
            txt += row;
        }

        const jsonArray = await csv({
            header: true,
            trim: true
        }).fromString(txt);

        const columnKeys = Object.keys(jsonArray[0]);
        columnKeys.pop();
        const columns = [];

        for (let columnKey of columnKeys) {
            columns.push({
                title: columnKey,
                field: columnKey,
                validate: rowData => rowData[columnKey] === '' ? { isValid: false, helperText: `${columnKey} boş bırakılamaz` } : true
            })
        }
        setColumns(columns);
        setItems(jsonArray);
    }

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
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    readCSV(file);
                }}
            />
            <MTable data={items} columns={columns} tprops={salesTableProps} />
        </div>
    )
}
