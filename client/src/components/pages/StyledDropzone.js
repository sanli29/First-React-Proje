import React, { useMemo, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
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

    const fileContext = useContext(FileContext);
    const { importFile, err, file } = fileContext;

    const onDrop = useCallback(acceptedFiles => {
        console.log('dosya burda');
        console.log(acceptedFiles);
        const file = acceptedFiles[0];
        importFile({
            name: file.path,
            extention: file.type,
            data: [{
                sale: 'emre'
            }]
        });
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