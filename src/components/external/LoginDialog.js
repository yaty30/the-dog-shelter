import react, { useState, forwardRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Login from './Login'
import { DialogContent, Grid } from '@mui/material';
import { user } from 'src/states/loginStates'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CircularProgress, TextField, Chip } from '@mui/material';
import { useNavigate } from "react-router-dom";

import { login } from '../../apis/login'
import { restoreDogList, getFavouriteList } from 'src/apis/dogs';
import { getMessageByID } from 'src/apis/chat';
import { cesar } from 'src/utils';


import { observer } from 'mobx-react-lite'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default observer(() => {
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [incorrect, setIncorrect] = useState(false)

    let navigate = useNavigate()

    const handleLogin = () => {
        let data = {
            email: username,
            password: btoa(password)
        }

        setLoad(true)

        login(data).then(x => {
            if (x) {
                restoreDogList()
                setOpen(false)
                navigate("/home")
            }
            setTimeout(() => {
                setLoad(false)
                setIncorrect(true)
                setPassword("")
            }, 400)
        })

    }

    const handleClickOpen = () => {
        setOpen(true);

        setUsername("")
        setPassword("")
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        user.isLogined() && setOpen(false)
    }, [user.id])

    return (
        <div>
            <Button onClick={handleClickOpen} style={{ background: '#f1f1f1', width: 100, color: '#49311A', opacity: 0.85 }}>
                Login
            </Button>
            <Dialog
                // fullScreen
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <Grid container spacing={3} justifyContent="center" alignItems="center" direction="row">
                    <Grid item xs={12}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="250"
                                image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2022-01/220128-chihuahua-mb-0853-a252ab.jpg"
                                alt="The Canine Shelte"
                            />
                            <CardContent style={{ padding: '5px 55px 55px 55px' }}>
                                <Typography style={{ fontSize: 25, fontWeight: 'bold', width: '100%', textAlign: 'center', margin: '25px 0' }}>
                                    LOGIN
                                </Typography>
                                {incorrect &&
                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                        <Chip label="Incorrect Email/Password" color="error" style={{ marginBottom: 25 }} />
                                    </div>
                                }
                                <TextField
                                    size="small" type="text" label="Username"
                                    color={incorrect ? "error" : "info"} autoFocus={incorrect}
                                    variant="outlined" style={{ marginBottom: 25, width: '100%' }}
                                    value={username} onChange={(e) => setUsername(e.target.value)}
                                    disabled={load}
                                />
                                <TextField
                                    size="small" type="password"
                                    color={incorrect ? "error" : "info"}
                                    label="Password" variant="outlined"
                                    style={{ marginBottom: 25, width: '100%' }}
                                    onKeyPress={() => username !== "" || password !== "" && handleLogin()}
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    disabled={load}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleLogin}
                                    style={{ width: '100%' }}
                                    size="large"
                                    disabled={load || username === "" || password === ""}
                                >
                                    {load ? <CircularProgress size={25} style={{ color: '#fff' }} /> : "LOGIN"}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
})