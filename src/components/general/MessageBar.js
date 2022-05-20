import react, { useState, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { observer } from 'mobx-react-lite'
import { messageBar } from 'src/states/generalStates';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default observer(() => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        messageBar.close();
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={messageBar.status} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={messageBar.severity} sx={{ width: '100%' }}>
                    {messageBar.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
})