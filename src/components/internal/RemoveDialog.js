import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

import { dogList } from 'src/states/dogStates';
import { observer } from 'mobx-react-lite'
import { removeDog } from 'src/apis/dogs';
import { user } from 'src/states/loginStates';

export default observer((data) => {
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleRemove = () => {
        setLoad(true)
        let removeData = {
            id: data.data,
            token: user.getToken()
        }
        removeDog(removeData)
        setTimeout(() => {
            setLoad(false)
            handleClose()
        }, 1200)
    }

    // const id = data.data

    return (
        <div>
            <Button
                size="small" color="inherit" variant="contained"
                onClick={handleClickOpen} style={{ color: '#EC4444', background: '#FFEAEA' }}
            >
                Remove
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Remove Dog
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to continue to remove this dog's information?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={load} onClick={handleClose}>Back</Button>
                    <Button disabled={load} onClick={handleRemove} autoFocus>
                        {load ? <CircularProgress size={25} /> : "Continue"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})