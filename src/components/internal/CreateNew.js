import react, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

import { observer } from 'mobx-react-lite'
import { ContrastSharp } from '@mui/icons-material';
import { DialogActions } from '@mui/material';
import { dogList } from 'src/states/dogStates';

export default observer(() => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const [breed, setBreed] = useState("");
    const [birthday, setBirthday] = useState("");
    const [chipNo, setChipNo] = useState("");
    const [seterillsed, setSeterillsed] = useState(false);
    const [intake, setIntake] = useState("");
    const [location, setLocation] = useState("");
    const [size, setSize] = useState("");
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState("");
    const [weight, setWeight] = useState("0.0");

    const handleClose = () => {
        floatingMenu.cancle()
        setName("")
        setDescription("")
        setGender("")
        setBreed("")
        setBirthday("")
        setChipNo("")
        setSeterillsed("")
        setIntake("")
        setLocation("")
        setSize("")
        setNotes("")
        setImage("")
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
        setImage(url)
    }

    const addSpace = (val) => {
        const one = val.substring(0, 3)
        const two = val.substring(3, 6)
        const three = val.substring(6, 9)

        return val.length === 9 ? `${one} ${two} ${three}` : val
    }

    const shouldDisable = () => {
        let result = []
        const isEmpty = (variable) => {
            return variable === ""
        }
        const list = [name, gender, location, seterillsed, breed, birthday, chipNo, intake, description, image, notes, size, weight];
        list.map(x => result.push(isEmpty(x) ? "1" : "0"))

        return result.filter(x => x === "1").legnth > 0
    }

    const handleCreate = () => {
        const data = {
            id: 0,
            name: name,
            gender: gender,
            location: location,
            seterillsed: seterillsed,
            breed: breed,
            birthday: birthday,
            mircochipNo: chipNo,
            intake: intake,
            description: description,
            profileImage: image,
            notes: notes,
            size: size,
            weight: +weight
        }

        // console.log(data)
        dogList.createNew(data)
        floatingMenu.cancle()
    }

    return (
        <>
            <Dialog
                open={floatingMenu.clickedMenu === "Create New"}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
            >
                <DialogContent>
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
                                                <TextField label="Breed" style={{ width: '100%' }} variant="outlined" value={breed} onChange={(e) => setBreed(e.target.value)} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField label="Birthday" style={{ width: '100%' }} variant="outlined" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
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
                                                    inputProps={{
                                                        maxLength: 13,
                                                        step: "0.1"
                                                    }}
                                                    onChange={(e) => setWeight(parseFloat(e.target.value).toFixed(1))}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField label="Intake" style={{ width: '100%' }} variant="outlined" value={intake} onChange={(e) => setIntake(e.target.value)} />
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
                            breed === "" || birthday === "" || chipNo === "" || intake === "" ||
                            description === "" || image === "" || size === "" || weight === ""
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