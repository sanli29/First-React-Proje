import React, { useContext } from 'react';
import MessageContext from '../../context/message/messageContext';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    }
}));

export default function Messages() {
    const classes = useStyles();
    const messageContext = useContext(MessageContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        messageContext.messages.length > 0 &&
        messageContext.messages.map(message => (
            <Snackbar key={message.id} open={true} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={message.type}>
                    {message.msg ? message.msg : 'Occured with unexpected error.'}
                </Alert>
            </Snackbar>
        ))
    );
}
