import react, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Divider, Grid, TextField, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite'
import { sendMessage } from 'src/apis/contact';
import { messageBar } from 'src/states/generalStates';

export default observer(() => {
    const [open, setOpen] = useState(false);
    const [curr, setCurr] = useState(0)
    const [load, setLoad] = useState(false)
    const [mapLoad, setMapLoad] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [addr, setAddr] = useState(
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8223047129254!2d114.12906631541946!3d22.28472004909061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403ff9b25ea1c9d%3A0x37bb4ce36628b4c!2sBrilliant%20Court%2C%2028%20Praya%2C%20Kennedy%20Town%2C%20Kennedy%20Town!5e0!3m2!1sen!2shk!4v1653465431631!5m2!1sen!2shk"
    )

    useEffect(() => {
        setTimeout(() => {
            setMapLoad(false)
        }, 500)
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = () => {
        setLoad(true)
        let messageData = {
            name: name,
            email: email,
            message: message
        }
        sendMessage(messageData).then((res) => {
            if (res) {
                setTimeout(() => {
                    messageBar.open("Your message has been sent!", "success")
                    setLoad(false)
                    setName("")
                    setEmail("")
                    setMessage("")
                }, 1200)
            } else {
                messageBar.open("Your message cannot be sent, please try again.", "error")
            }
        })
    }

    const handleMapChange = (index) => {
        let zeroMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8223047129254!2d114.12906631541946!3d22.28472004909061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403ff9b25ea1c9d%3A0x37bb4ce36628b4c!2sBrilliant%20Court%2C%2028%20Praya%2C%20Kennedy%20Town%2C%20Kennedy%20Town!5e0!3m2!1sen!2shk!4v1653465431631!5m2!1sen!2shk"
        let oneMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.530515981034!2d114.14946851542122!3d22.44668984323632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340408226c396587%3A0xb14c8435eaf522f0!2s6%20Shek%20Lin%20Rd%2C%20Tai%20Po!5e0!3m2!1sen!2shk!4v1653465548392!5m2!1sen!2shk"
        
        setMapLoad(true)
        setCurr(index)
        setAddr(index === 0 ? zeroMap : oneMap)

        setTimeout(() => {
            setMapLoad(false)
        }, 1200)
    }

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

                    <div style={{ padding: '75px 55px 35px 55px', marginTop: 25 }}>
                        <Grid container spacing={8}>
                            <Grid item xs={5}>

                                <Button
                                    variant={curr === 0 ? "contained" : "outlined"} color="inherit"
                                    style={{
                                        display: 'block',
                                        color: '#616264',
                                        marginBottom: 15, textTransform: 'none',
                                        width: '100%', textAlign: 'center'
                                    }}
                                    onClick={() => handleMapChange(0)}
                                >
                                    Shop 4, G/F, Brilliant Court, Sai Hong Lane, No.28 Praya, Kennedy Town, Hong Kong
                                </Button>
                                <Button
                                    variant={curr === 1 ? "contained" : "outlined"} color="inherit"
                                    style={{
                                        display: 'block',
                                        color: '#616264',
                                        marginBottom: 15, textTransform: 'none',
                                        width: '100%', textAlign: 'center'
                                    }}
                                    onClick={() => handleMapChange(1)}
                                >
                                    6 Shek Lin Road, Tai Po, Hong Kong
                                </Button>
                                <Button
                                    variant="outlined" color="inherit"
                                    style={{
                                        display: 'block',
                                        color: '#616264',
                                        marginBottom: 15, textTransform: 'none',
                                        width: '100%'
                                    }}
                                >
                                    Opening Hours: 10a.m. to 6p.m. Every Day
                                </Button>
                                <Button
                                    variant="outlined" color="inherit"
                                    style={{
                                        display: 'block',
                                        color: '#616264',
                                        marginBottom: 15, textTransform: 'none',
                                        width: '100%'
                                    }}
                                >
                                    Email: info@thecanineshelter.com
                                </Button>
                                {mapLoad ?
                                    <Button disabled style={{ width: '100%', marginTop: 35 }}><CircularProgress /></Button>
                                    :
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8223047129254!2d114.12906631541946!3d22.28472004909061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403ff9b25ea1c9d%3A0x37bb4ce36628b4c!2sBrilliant%20Court%2C%2028%20Praya%2C%20Kennedy%20Town%2C%20Kennedy%20Town!5e0!3m2!1sen!2shk!4v1653465431631!5m2!1sen!2shk"
                                        style={{ border: 0, borderRadius: 5 }} width="100%" height="200"
                                        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                                    />
                                }
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    type="text" variant="outlined"
                                    label="Name" size="small"
                                    style={{ width: "100%", marginBottom: 25 }}
                                    disabled={load} value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    type="text" variant="outlined"
                                    label="Email" size="small"
                                    style={{ width: "100%", marginBottom: 25 }}
                                    disabled={load} value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    type="text" variant="outlined"
                                    label="Message" size="small"
                                    multiline rows={9}
                                    style={{ width: "100%", marginBottom: 25 }}
                                    disabled={load} value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <Button
                                    variant="contained" color="inherit"
                                    onClick={handleSend} disabled={load}
                                    style={{ width: '100%', color: '#f1f1f1', background: load ? '#f1f1f1' : '#E2AF50', }}
                                >
                                    {load ? <CircularProgress size={25} style={{ color: '#E2AF50' }} /> : "Send"}
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
})