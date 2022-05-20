import react, { useState } from 'react'
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
import { preFilleEmail } from 'src/states/registerStates';

import { observer } from 'mobx-react-lite'

export default observer(() => {
    const [email, setEmail] = useState("")

    return (
        <>
            <Box sx={{ flexGrow: 1, paddingTop: 1 }}>
                <div style={{ position: 'absolute', top: 0, zIndex: 1, height: '100vh' }}>
                    <div style={{ width: '100%', height: '100%', background: 'black', position: 'absolute', zIndex: 2, opacity: 0.5 }}>123</div>
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
                            variant="filled" type="text" label="Email Address"
                            value={preFilleEmail.value} onChange={(e) => preFilleEmail.setEmail(e.target.value)}
                            style={{ background: '#f1f1f1', borderRadius: 5, width: '100%' }}
                            onKeyPress={(e) => {
                                if (preFilleEmail.value !== "") {
                                    e.key === "Enter" && registerDialogStatus.setForm(true)
                                }
                            }}
                            disabled={registerDialogStatus.registerForm}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        {preFilleEmail.value === "" ? <IconButton disabled><NavigateNextIcon /></IconButton> : <RegisterDialog />}
                                    </InputAdornment>
                            }}
                        />
                    </div>
                </Grid>
            </Grid>

        </>
    )
})