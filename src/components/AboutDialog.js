import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { observer } from 'mobx-react-lite'

export default observer(() => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen} style={{ width: 170, color: '#171717' }}>
                About
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    About Us
                </DialogTitle>
                <DialogContent>
                    <img src="https://media-be.chewy.com/wp-content/uploads/2016/12/11131940/happy-senior-dog.jpg" style={{width: '100%'}}/>
                    <DialogContentText style={{marginTop: 25, fontSize: 19, color: '#333', lineHeight: 1.5}}>
                        <obj style={{marginRight: 25}} />
                        The Canine Shelter was founded in 2022 for the specific purpose of saving dogs and puppies from the Hong Kong Government's Agriculture, Fisheries and Conservation Department (AFCD) Animal Management Centres.  The organisation has cared for and re-homed more than 10,000 dogs while being largely funded by private donations, sales of The Canine Shelter merchandises and fundraising events. The Canine Shelter is proud to be a No Kill Organisation, meaning that no dog under its care will be euthanised for any reason other than when it is the only humane option.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})