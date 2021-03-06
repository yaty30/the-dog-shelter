import react, { useState, useEffect } from 'react'
import { Grid, InputAdornment, Button, Typography, TextField } from '@mui/material'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import RegisterDialog from './RegisterDialog';
import LoginDialog from './LoginDialog';

import { register as registerDialogStatus } from 'src/states/globalDialogStates';
import { preFillEmail } from 'src/states/registerStates';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite'
import { login } from 'src/states/loginStates';

export default observer((data) => {
    const [email, setEmail] = useState("")
    let navigate = useNavigate()
    useEffect(() => {
        setEmail("")
        preFillEmail.setEmail("")
    }, [])
    const emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (
        <>
            <Box sx={{ flexGrow: 1, paddingTop: 1 }}>
                <div style={{ position: 'absolute', top: 0, zIndex: 1, height: '100vh' }}>
                    <div style={{ width: '100%', height: '100%', background: 'black', position: 'absolute', zIndex: 2, opacity: 0.5 }}>1</div>
                    <img src="https://wallpaperboat.com/wp-content/uploads/2019/04/cute-dog-wallpaper-picture-010.jpg" width="100%" style={{ height: '100vh' }} />
                </div>
                <AppBar position="static" style={{ background: 'none', boxShadow: 'none', position: 'absolute', zIndex: 2 }}>
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }}>
                            <img src="https://img.icons8.com/cotton/344/dog-jump--v1.png" width="3%" style={{ margin: '10px 20px', position: 'relative', bottom: 3 }} />
                            <Button style={{ position: 'relative', bottom: 25, fontSize: 19, color: '#f1f1f1', fontWeight: 'bold' }}>
                                The Canine Shelter
                            </Button>
                        </Box>
                        <Button onClick={() => {
                            navigate("/home")
                            login.setLogin(false)
                        }} variant="outlined" color="inherit" style={{ color: '#f1f1f1', marginRight: 30 }}>Just Visit</Button>
                        <LoginDialog />
                    </Toolbar>
                </AppBar>
            </Box>

            <Grid container spacing={3} justifyContent="center" alignItems="center" direaction="row" style={{ position: 'absolute', zIndex: 3, top: '28%' }}>
                <Grid item xs={5} style={{ textAlign: 'center' }}>
                    <Typography style={{ color: '#f1f1f1', fontWeight: 'bold', fontSize: 45 }}>
                        Baby, Young, Adult Dogs
                    </Typography>
                    <Typography style={{ color: '#f1f1f1', fontWeight: 'bold', fontSize: 33 }}>
                        Adopt Any Dog You Like!
                    </Typography>

                    <Typography style={{ color: '#f1f1f1', fontSize: 18, position: 'relative', top: 25 }}>
                        Don't have an account? Enter your email to create your account.
                    </Typography>
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={5} style={{ textAlign: 'center' }}>
                    <div style={{ marginTop: 25 }}>
                        <TextField
                            variant="filled" type="email" label="Email Address"
                            autoComplete="off"
                            value={preFillEmail.value} onChange={(e) => preFillEmail.setEmail(e.target.value)}
                            style={{ background: '#f1f1f1', borderRadius: 5, width: '100%' }}
                            onKeyPress={(e) => {
                                if (preFillEmail.value !== "") {
                                    e.key === "Enter" && registerDialogStatus.setForm(true)
                                }
                            }}
                            disabled={registerDialogStatus.registerForm}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        {emailFilter.test(preFillEmail.value) && <RegisterDialog />}
                                    </InputAdornment>
                            }}
                        />
                    </div>
                    <div style={{ marginTop: 25 }}>

                    </div>
                </Grid>
            </Grid>

        </>
    )
})