import React, { useMemo, useCallback, useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { csv } from "csvtojson";

import AlertContext from '../../context/alert/alertContext';
import FileContext from '../../context/file/fileContext';


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function StyledDropzone(props) {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const fileContext = useContext(FileContext);
    const { importFile, file, err, clearErrors } = fileContext;
    useEffect(() => {
        if (!err && file)
            setAlert('Imported successfully.', 'success');
        else if (err)
            setAlert(err, 'danger');
        clearErrors();
    }, [err, file])


    const onDrop = useCallback(async (acceptedFiles) => {
        console.log('dosya burda');
        console.log(acceptedFiles);
        const file = acceptedFiles[0];
        const sales = await readCSV(file);

        importFile({
            name: file.path,
            extention: file.type,
            data: sales
        });

        console.log(sales);
        console.log(err);
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: '.csv, application/vnd.ms-excel, text/csv', onDrop });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const readCSV = async (file) => {
        return new Promise(async (resolve, reject) => {
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
                    validate: rowData => rowData[columnKey] === '' ? { isValid: false, helperText: `${columnKey} can not be empty` } : true
                })
            }
            resolve(jsonArray);
        });
    }

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </div>
    );
}

<StyledDropzone />

export default StyledDropzone;