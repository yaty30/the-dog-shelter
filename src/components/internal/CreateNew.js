import react, { useState } from 'react';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { autocompleteDogList } from 'src/states/dogStates';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import { floatingMenu } from 'src/states/floatingMenuStates';

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded';
import DogListAutocomplete from '../DogListAutocomplete';

import { observer } from 'mobx-react-lite'
import { breedList, getImageBase64, getToday } from 'src/utils';
import { ContrastSharp } from '@mui/icons-material';
import { DialogActions } from '@mui/material';
import { dogList } from 'src/states/dogStates';

import { addDog } from 'src/apis/dogs';
import { user } from 'src/states/loginStates';
import { set } from 'mobx';

export default observer(() => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const [load, setLoad] = useState(false);
    const [birthday, setBirthday] = useState("");
    const [chipNo, setChipNo] = useState("");
    const [seterillsed, setSeterillsed] = useState(false);
    const [intake, setIntake] = useState("");
    const [location, setLocation] = useState("");
    const [size, setSize] = useState("");
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState("");
    const [imageBase64, setImageBase64] = useState("")
    const [weight, setWeight] = useState("0.0");
    const [bdayValid, setBdayValid] = useState(false)

    const handleClose = () => {
        floatingMenu.cancle()
        setName("")
        setDescription("")
        setGender("")
        // setBreed("")
        autocompleteDogList.setBreed("")
        setBirthday("")
        setChipNo("")
        setSeterillsed("")
        setIntake("")
        setLocation("")
        setSize("")
        setNotes("")
        setImage("")
        setImageBase64("")
        setWeight(0)
    };

    const SelectMenu = (label, value, set, options) => {
        return (
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={value}
                    label={label}
                    style={{ width: '100%' }}
                    onChange={set}
                >
                    {options.map((x, i) =>
                        <MenuItem value={x.value}>{x.label}</MenuItem>
                    )}
                </Select>
            </FormControl>
        )
    }

    const handleUploadImage = (target) => {
        let url = URL.createObjectURL(target)
        // newItem.uploadImage(url)
        getImageBase64(target).then(data =>
            setImageBase64(data)
        )
        setImage(url)
    }

    const addSpace = (val) => {
        const one = val.replaceAll(" ", "").substring(0, 3)
        const two = val.replaceAll(" ", "").substring(3, 6)
        const three = val.replaceAll(" ", "").substring(6, 9)

        // return val.length === 9 ? `${one} ${two} ${three}` : val
        if (val.length === 3) {
            return `${one} `
        }
        if (val.length === 7) {
            return `${one} ${two} `
        }
        if (val.length > 7) {
            return `${one} ${two} ${three}`
        }

        return val
    }

    const dayMask = (val) => {
        const year = val.replaceAll("-", "").substring(0, 4)
        const month = val.replaceAll("-", "").substring(4, 6)
        const day = val.replaceAll("-", "").substring(6, 8)

        if (val.length === 4) {
            return `${year}-`
        }
        if (val.length === 7) {
            return `${year}-${month}-`
        }
        if (val.length > 8) {
            return `${year}-${month}-${day}`
        }

        return val
    }

    const bdayValidator = (val) => {
        const date = new Date()
        const year = val.replaceAll("-", "").substring(0, 4)
        const month = val.replaceAll("-", "").substring(4, 6)
        const day = val.replaceAll("-", "").substring(6, 8)

        // const odd = (month) => {
        //     let odd = [1, 3, 5, 7, 8, 10, 12]
        //     if(month === 2) {
        //         return 28
        //     }
        //     if(odd.includes(month)) {
        //         return 31
        //     }
        //     return 30
        // }

        // let yearValid = +year > 2000 && +year <= +date.getFullYear()
        // let monthValid = +month >= 1 && +month <= 12
        // let dayValid = +day >= 1 && +day <= odd(+month)

        // setBdayValid(yearValid && monthValid && dayValid)

        return dayMask(val)
    }

    const shouldDisable = () => {
        let result = []
        const isEmpty = (variable) => {
            return variable === ""
        }
        const list = [name, gender, location, seterillsed, autocompleteDogList.breed, birthday, chipNo, intake, description, image, notes, size, weight];
        list.map(x => result.push(isEmpty(x) ? "1" : "0"))

        return result.filter(x => x === "1").legnth > 0
    }

    const handleCreate = () => {
        const data = {
            name: name,
            gender: gender,
            location: location,
            seterillsed: seterillsed,
            breed: autocompleteDogList.breed,
            birthday: birthday,
            mircochipNo: chipNo,
            intake: intake,
            description: description,
            profileImage: imageBase64,
            notes: notes,
            size: size,
            weight: +weight,
            addedBy: "system",
            token: user.getToken()
        }

        setLoad(true)
        setTimeout(() => {
            addDog(data)
            floatingMenu.cancle()
            setLoad(false)
        }, 1100)
    }

    const reBreedList = breedList().map(x => ({
        label: x.name,
        value: x.name
    }))

    return (
        <>
            <Dialog
                open={floatingMenu.clickedMenu === "Create New"}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
            >
                <DialogContent>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={load}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Grid container>
                        <Grid item xs={12} md={5}>
                            {image !== "" ?
                                <Tooltip
                                    title={<IconButton onClick={() => setImage("")}><DeleteForeverRoundedIcon style={{ color: '#fff', fontSize: 35 }} /></IconButton>}
                                    placement="left" arrow
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                backgroundColor: "#FF1A51",
                                                "&:before": {
                                                    border: "1px solid #E6E8ED"
                                                },
                                                color: "#fff"
                                            }
                                        }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={image}
                                        height="600"
                                    />
                                </Tooltip>
                                :
                                <Button
                                    variant="outlined"
                                    component="label"
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                >
                                    <AddPhotoAlternateOutlinedIcon style={{ fontSize: 45 }} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleUploadImage(e.target.files[0])}
                                    />
                                </Button>
                            }

                        </Grid>
                        <Grid item xs={12} md={7}>
                            <div style={{ padding: '15px 35px' }}>
                                <div className="createNewDialogDiv">
                                    <div style={{ margin: '35px 0 5px 0' }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <TextField label="Name" style={{ width: '100%' }} variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField label="Description" style={{ width: '100%' }} multiline rows={3} variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {SelectMenu(
                                                    "Gender", gender, (e) => setGender(e.target.value),
                                                    [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }]
                                                )}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* {SelectMenu(
                                                    "Breed", breed, (e) => setBreed(e.target.value), reBreedList
                                                )} */}
                                                <DogListAutocomplete edit={{ edit: false, val: "" }} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    type="date" style={{ width: '100%' }}
                                                    variant="outlined" onKeyDown={(e) => e.key === "Backspace" && setBirthday("")}
                                                    value={birthday} onChange={(e) => setBirthday(e.target.value)}
                                                    InputProps={{
                                                        inputProps: {
                                                            min: "2000-01-01",
                                                            max: getToday()
                                                        }
                                                    }}
                                                />
                                                {/* <DesktopDatePicker
                                                    label="Date desktop"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={birthday}
                                                    onChange={(e) => setBirthday(e.target.value)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                /> */}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    label="Mircochip No" style={{ width: '100%' }}
                                                    variant="outlined" value={addSpace(chipNo)}
                                                    onChange={(e) => setChipNo(e.target.value)}
                                                    onKeyDown={(e) => e.key === "Backspace" && setChipNo("")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {SelectMenu(
                                                    "Size", size, (e) => setSize(e.target.value),
                                                    [{ label: "Small", value: "S" }, { label: "Medium", value: "M" }, { label: "Large", value: "L" },]
                                                )}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {SelectMenu(
                                                    "Seterillsed", seterillsed, (e) => setSeterillsed(e.target.value),
                                                    [{ label: "Yes", value: true }, { label: "No", value: false }]
                                                )}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    type="number"
                                                    value={weight} style={{ width: '100%' }}
                                                    label="Weight (Pound)"
                                                    variant="outlined"
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0,
                                                            max: 100,
                                                            step: "0.2",
                                                        }
                                                    }}
                                                    onChange={(e) => setWeight(parseFloat(e.target.value).toFixed(1))}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {SelectMenu(
                                                    "Intake", intake, (e) => setIntake(e.target.value),
                                                    [{ label: "Rescue from Stray", value: "stray" }, { label: "Rescued by Inspectors", value: "inspectors" }, { label: "SBO - No idea to take care", value: "SBO" }]
                                                )}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {SelectMenu(
                                                    "Location", location, (e) => setLocation(e.target.value),
                                                    [{ label: "Hong Kong Head Centre", value: "Hong Kong Head Centre" }, { label: "Wan Chai Centre", value: "Wan Chai Centre" }, { label: "Mong Kok Centre", value: "Mong Kok Centre" }, { label: "Sai Kung Centre", value: "Sai Kung Centre" }]
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField label="Notes" style={{ width: '100%' }} multiline rows={3} variant="outlined" value={notes} onChange={(e) => setNotes(e.target.value)} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCreate}
                        style={{ marginRight: 15, marginBottom: 10, width: 130 }}
                        disabled={
                            name === "" || gender === "" || location === "" || seterillsed === "" ||
                            autocompleteDogList.breed === "" || birthday === "" || chipNo === "" || intake === "" ||
                            description === "" || image === "" || size === "" || weight === "" || weight === "0" ||
                            weight === "0.0"
                        }
                        variant="contained"
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
})