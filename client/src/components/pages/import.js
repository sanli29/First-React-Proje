import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    page: {
        padding: '1rem'
    }
}));



function Import() {
    const classes = useStyles();

    const readCSV = (file) => {

    }


    return (
        <div className={classes.page} >
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    readCSV(file);
                }}
            />
        </div>
    );
}

export default Import;