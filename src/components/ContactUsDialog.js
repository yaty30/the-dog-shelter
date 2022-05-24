import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Divider, Grid } from '@mui/material';
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
                Contact
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle>
                    <Typography style={{ fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center', margin: '15px 0' }}>
                        GET IN TOUCH
                    </Typography>
                    <div style={{ padding: '0 45%', position: 'relative', bottom: 5 }}>
                        <Divider />
                    </div>
                </DialogTitle>
                <DialogContent>
                    {/* <img src="https://media-be.chewy.com/wp-content/uploads/2016/12/11131940/happy-senior-dog.jpg" style={{width: '100%'}}/> */}

                    <div style={{ padding: '25px 65px', marginTop: 25 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" style={{ display: 'block', marginTop: 15, width: '100%' }}>Address: Shop 4, G/F, Brilliant Court, Sai Hong Lane, No.28 Praya, Kennedy Town, Hong Kong</Button>
                                        <Button variant="outlined" style={{ display: 'block', marginTop: 15, width: '100%' }}>Address: 6 Shek Lin Road, Tai Po, Hong Kong</Button>
                                        <Button variant="outlined" style={{ display: 'block', marginTop: 15, width: '100%' }}>Opening Hours: 10a.m. to 6p.m. Every Day</Button>
                                        <Button variant="outlined" style={{ display: 'block', marginTop: 15, width: '100%' }}>Email: info@thecanineshelter.com</Button>
                                    </Grid>

                                </Grid>

                            </Grid>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <img src="https://www.google.com/maps/d/thumbnail?mid=1CzO3A1Dgwse-TMDfVS0NFzhDhh0" style={{ width: '100%' }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})