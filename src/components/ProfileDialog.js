import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Typography, Chip, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { userProfile } from 'src/states/loginStates';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
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
            <MenuItem onClick={handleClickOpen}>Profile</MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography style={{ fontSize: 22, fontWeight: 'bold', width: '100%', textAlign: 'center', margin: '15px 0' }}>
                        PROFILE
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} justifyContent="center" alignItems="center" direction="row">
                        {userProfile.getProfileData().map((x, i) =>
                            <>
                                <Grid item xs={6} style={{ textAlign: 'center' }}>
                                    <Chip icon={<BadgeRoundedIcon />} label={`User Name: ${x.username}`} style={{ fontSize: 16, width: '100%' }} color="info" />
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'center' }}>
                                    <Chip icon={<AccountCircleRoundedIcon />} label={`User Type: ${x.userType}`} style={{ fontSize: 16, width: '100%' }} color="info" />
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'center' }}>
                                    <Chip icon={<NumbersRoundedIcon />} label={`User ID: ${x.id}`} style={{ fontSize: 16, width: '100%' }} color="info" />
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'center' }}>
                                    <Chip icon={<EmailRoundedIcon />} label={`Email: ${x.email}`} style={{ fontSize: 16, width: '100%' }} color="info" />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>DONE</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})