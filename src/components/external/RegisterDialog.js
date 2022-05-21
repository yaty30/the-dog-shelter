import react, { useState, forwardRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { IconButton, Slide, Grid, TextField, Typography } from '@mui/material'

import { registerForm } from 'src/states/registerStates';
import { register as registerDialog } from 'src/states/globalDialogStates';

import { observer } from 'mobx-react-lite'

import RegistetTandC from './RegistetTandC';
import { messageBar } from 'src/states/generalStates';
import { preFillEmail } from 'src/states/registerStates';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const getLabel = (text, required) => {
    return (
        <span>
            {required && <span style={{ color: '#FF2D55' }}>{`* `}</span>}{text}
        </span>
    )
}

export default observer(() => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(preFillEmail.value);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [purpose, setPurpose] = useState('');
    const [gender, setGender] = useState("");
    const [isAdult, setIsAdult] = useState("");
    const [own, setOwn] = useState("")
    const [isStaff, setIsStaff] = useState("")
    const [code, setCode] = useState("")

    const handleChange = (event) => {
        setPurpose(event.target.value);
    };

    const handleClickOpen = () => {
        registerDialog.setForm(true)
        console.log(preFillEmail.value)
    };

    const handleClose = () => {
        registerDialog.setForm(false)
    };

    const shouldDisabled = () => {
        return !!!(purpose === "adopt" || purpose === "")
    }

    const getPreparedData = () => {
        const preparedData = {
            email: preFillEmail.value,
            name: name,
            phone: +phone,
            gender: gender,
            haveDog: own === "yes",
            purpose: purpose,
            isAdult: isAdult === "yes",
            isStaff: isStaff === "yes",
            signUpCode: code
        }

        return preparedData
    }

    const handleSubmitForm = () => {
        registerForm.setData(getPreparedData())
        preFillEmail.setEmail("")
        messageBar.open("Your account has been successfully created!", "success")
        handleClose()
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen} disabled={preFillEmail.value === ""}>
                <NavigateNextIcon />
            </IconButton>
            <Dialog
                open={registerDialog.registerForm}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    Register
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} style={{ padding: 10 }}>
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                value={preFillEmail.value} label={getLabel("Email Address", true)}
                                style={{ width: '100%' }}
                                onChange={(e) => preFillEmail.setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                value={name} label={getLabel("Name", true)}
                                style={{ width: '100%' }} type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                value={phone} label={getLabel("Phone", true)}
                                style={{ width: '100%' }} type="number"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="demo-simple-select-label">{getLabel("Gender", true)}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label={getLabel("Gender", true)}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="demo-simple-select-label">{getLabel("Have you own a dog before?", true)}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={own}
                                    label={getLabel("Have you own a dog before?", true)}
                                    onChange={(e) => setOwn(e.target.value)}
                                >
                                    <MenuItem value="yes">Yes, I had/have a dog</MenuItem>
                                    <MenuItem value="no">No, I haven't</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="demo-simple-select-label">{getLabel("Register to", true)}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={purpose}
                                    label={getLabel("Register to", true)}
                                    onChange={(e) => {
                                        setPurpose(e.target.value)
                                        setIsAdult("")
                                        setIsStaff("")
                                        setCode("")
                                    }}
                                >
                                    <MenuItem value="adopt">Adopt a dog</MenuItem>
                                    <MenuItem value="charity_worker">Be a charity worker</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="demo-simple-select-label">{getLabel("Are you over 18", shouldDisabled())}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={isAdult}
                                    label={getLabel("Are you over 18", shouldDisabled())}
                                    onChange={(e) => setIsAdult(e.target.value)}
                                    disabled={!!!shouldDisabled()}
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="demo-simple-select-label">{getLabel("Are you a staff of the Dog Shelter", shouldDisabled())}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={isStaff}
                                    label={getLabel("Are you a staff of the Dog Shelter", shouldDisabled())}
                                    onChange={(e) => {
                                        setIsStaff(e.target.value)
                                        setCode("")
                                    }}
                                    disabled={!!!shouldDisabled()}
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                value={code} label={getLabel("Sign up code", isStaff === "yes")}
                                style={{ width: '100%' }} type="text"
                                onChange={(e) => setCode(e.target.value)}
                                disabled={isStaff === "" || isStaff === "no"}
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Back</Button>

                    {shouldDisabled() ?
                        <RegistetTandC data={getPreparedData()} />
                        :
                        <Button onClick={handleSubmitForm} autoFocus>
                            Continue
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
})