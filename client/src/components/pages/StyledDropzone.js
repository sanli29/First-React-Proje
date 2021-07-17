import React, { useMemo, useCallback, useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { csv } from "csvtojson";

import AlertContext from '../../context/alert/alertContext';
import FileContext from '../../context/file/fileContext';
import MessageContext from '../../context/message/messageContext';


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
    const { importFile, file, err, messages, clearErrors } = fileContext;

    const messageContext = useContext(MessageContext);
    const { setMessage } = messageContext;
    useEffect(() => {
        if (fileContext.message) {
            setMessage(fileContext.message.content, fileContext.message.type);
            fileContext.clearErrors();
        }
    }, [fileContext.message]);


    const onDrop = useCallback(async (acceptedFiles) => {

        const files = acceptedFiles;

        for (let file of files) {
            const sales = await readCSV(file);
            console.log(sales);
            importFile({
                name: file.path,
                extention: file.type,
                data: sales
            });
        }


        const getSentenceFragment = (offset = 0) => new Promise((resolve, reject) => {
            const pageSize = 3;
            const sentence = [...'hello world'];
            setTimeout(() => resolve({
                data: sentence.slice(offset, offset + pageSize),
                nextPage: offset + pageSize < sentence.length ? offset + pageSize : undefined
            }), 500);
        });

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
            try {
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

                let requiredColumns = ['PO #', 'External ID', 'Title', 'ASIN',
                    'Model #', 'Freight Term', 'Qty', 'Unit Cost',
                    'Amount', 'Shortage quantity', 'Amount shortage',
                    'Last received date', 'ASIN received', 'Quantity received',
                    'Unit cost', 'Amount received']
                const columnKeys = Object.keys(jsonArray[0]);
                columnKeys.pop();

                if (JSON.stringify(requiredColumns) == JSON.stringify(columnKeys)) {



                    console.log(requiredColumns);
                    const columns = [];

                    for (let columnKey of columnKeys) {
                        columns.push({
                            title: columnKey,
                            field: columnKey,
                            validate: rowData => rowData[columnKey] === '' ? { isValid: false, helperText: `${columnKey} can not be empty` } : true
                        })
                    }
                    resolve(jsonArray);
                } else setMessage('Error file!', 'error');
            } catch (err) {
                setMessage('Error occured while file is uploading.', 'error', Math.floor(Date.now() / 1000));
            }
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