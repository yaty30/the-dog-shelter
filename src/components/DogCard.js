import react, { useState, useEffect, forwardRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import GirlIcon from '@mui/icons-material/FemaleRounded';
import BoyIcon from '@mui/icons-material/MaleRounded';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Slide from '@mui/material/Slide';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded';
import EditDog from './internal/EditDog'
import RemoveDialog from './internal/RemoveDialog';

import { observer } from 'mobx-react-lite'
import { floatingMenu } from 'src/states/floatingMenuStates';
import { ContrastSharp } from '@mui/icons-material';

import { dogList, editDogData } from 'src/states/dogStates';
import { login, user } from 'src/states/loginStates';
import { favouriteList } from 'src/states/favouriteListStates';
import { breedList, urlEncoder } from 'src/utils';

import { IconButton } from '@mui/material';
import { addFavourite, removeFavourite } from 'src/apis/dogs';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default observer((datas, dogIndex) => {
    const data = datas.data
    // const dogIndex = indexes
    const [open, setOpen] = useState(false);
    const [isFavourite, setIsFavourite] = useState(favouriteList.onList(data.id))
    const [moreAnchorEl, setMoreAnchorEl] = useState(null);
    const moreOpen = Boolean(moreAnchorEl);
    const handleMoreClick = (event) => {
        setMoreAnchorEl(event.currentTarget);
    };
    const handleMoreClose = () => {
        setMoreAnchorEl(null);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleEdit = () => {
        floatingMenu.setClicked("Edit dog")
        console.log(data)
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        editDogData.prepareEditData(data)
    }, [])

    const addSpace = (val) => {
        const one = val.replaceAll(" ", "").substring(0, 3)
        const two = val.replaceAll(" ", "").substring(3, 6)
        const three = val.replaceAll(" ", "").substring(6, 9)

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

    const getAge = () => {
        let today = new Date();
        let birthDate = new Date(data.birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age > 1 ? `${age} years old` : `${age} year old`
    }

    const intake = [{ label: "Rescue from Stray", value: "stray" }, { label: "Rescued by Inspectors", value: "inspectors" }, { label: "SBO - No idea to take care", value: "SBO" }]

    const list = [
        { label: "Gender", value: data.gender, set: "" },
        { label: "Breed", value: data.breed, set: "" },
        { label: "Birthday", value: `${data.birthday} (${getAge()})`, set: "" },
        { label: "Size", value: data.size === "L" ? "Large" : data.size === "M" ? "Medium" : "Small", set: "" },
        { label: "Mircochip No", value: addSpace(data.mircochipNo), set: "" },
        { label: "Seterillsed", value: data.seterillsed ? "Yes" : "No", set: "" },
        { label: "Intake", value: intake[intake.findIndex(x => x.value === data.intake)].label, set: "" },
        { label: "Location", value: data.location, set: "" },
    ]

    const handleFavourite = () => {
        const apiData = {
            id: `${user.getID()}`,
            newFavouriteID: data.id
        }
        addFavourite(apiData)
    }

    const handleRemoveFavourite = () => {
        const apiData = {
            id: `${user.getID()}`,
            targetID: data.id
        }
        removeFavourite(apiData)
    }

    const getShareContent = () => {
        let content = urlEncoder(`Check out ${data.name}-${data.id} at The Canine Shelter!`) + ` %23theCanineShelter`

        return content
    }

    return (
        <>
            <Card sx={{ maxWidth: 415 }}>
                {user.isClient() &&
                    <div style={{ position: 'absolute' }}>
                        {
                            favouriteList.onList(+data.id) ?
                                <IconButton onClick={handleRemoveFavourite} style={{ margin: 5 }}>
                                    <FavoriteIcon style={{ color: '#FA9DC5', fontSize: 30 }} />
                                </IconButton>
                                :
                                <IconButton onClick={handleFavourite} style={{ margin: 5 }}>
                                    <FavoriteBorderIcon style={{ fontSize: 30 }} />
                                </IconButton>

                        }
                    </div>
                }
                {
                    login.isLogin === false || !!!user.isClient() &&
                    <div style={{ position: 'absolute', width: '100%' }}>
                        <IconButton onClick={handleMoreClick} style={{ margin: 5, background: 'rgba(244,244,244,0.5)', margin: 10 }} size="small">
                            <MoreHorizIcon style={{ color: '#333', fontSize: 25 }} />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={moreAnchorEl}
                            open={moreOpen}
                            onClose={handleMoreClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            style={{ marginTop: 10 }}
                        >
                            <Paper elevation={0} style={{ padding: "10px 20px", width: 90 }}>
                                <EditDog datas={data.id} index={datas.dogIndex} />
                            </Paper>
                            <Paper elevation={0} style={{ padding: "10px 20px", width: 90 }}>
                                <RemoveDialog data={data.id} />
                            </Paper>
                        </Menu>
                    </div>
                }
                <div onClick={handleClickOpen} style={{ cursor: 'pointer' }}>
                    <CardMedia
                        component="img"
                        image={data.profileImage}
                        height="600"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: '"Lexend", sans-serif' }}>
                            {data.name} <span style={{ position: 'relative', top: data.gender === "Male" ? 4 : 2 }}>{data.gender === "Male" ? <BoyIcon style={{ color: '#2CA6D9' }} /> : <GirlIcon style={{ color: '#F47ADE' }} />}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ margin: '25px 0', height: 50 }}>
                            {data.description.substring(0, 121)}...
                        </Typography>

                        <div style={{ marginTop: 15 }}>
                            <Typography>
                                <FavoriteRoundedIcon style={{ position: 'relative', top: 4, marginRight: 5, color: '#E6A62D', fontSize: 20 }} /> {getAge()}
                            </Typography>
                            <Typography>
                                <ScaleRoundedIcon style={{ position: 'relative', top: 4, marginRight: 5, color: '#E6A62D', fontSize: 20 }} /> {data.weight} pounds
                            </Typography>
                        </div>
                    </CardContent>
                </div>
                <CardActions>
                    <Button size="small" component="label" variant="outlined" style={{ marginRight: 5 }}>
                        <a href={`https://twitter.com/intent/tweet?text=${getShareContent()}`} target="_blank" style={{ color: "#1876D2", textDecoration: 'none' }}>
                            Share to twitter
                        </a>
                    </Button>
                    <Button size="small" onClick={handleClickOpen}>Learn More</Button>
                </CardActions>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
            // keepMounted
            // TransitionComponent={Transition}
            >
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} md={5}>
                            <CardMedia
                                component="img"
                                image={data.profileImage}
                                height="600"
                                style={{ border: '1px solid #D4D5D7', borderRadius: 3 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <div style={{ padding: '15px 35px' }}>
                                <Typography style={{ fontSize: 20, fontFamily: '"Lexend", sans-serif', color: '#ccc' }}>
                                    #{data.id}
                                </Typography>
                                <Typography gutterBottom component="div" style={{ fontSize: 45, fontFamily: '"Lexend", sans-serif' }}>
                                    Name: <span style={{ marginLeft: 10 }}>{data.name}</span>
                                </Typography>
                                <Divider style={{ marginBottom: 25 }} />
                                <div className="dogDialogDiv">
                                    <Typography gutterBottom component="div" style={{ fontSize: 20, fontFamily: '"Lusitana", serif' }}>
                                        <span style={{ marginLeft: 0 }}>{data.description}</span>
                                    </Typography>
                                    {/* <Divider style={{ margin: '20px 0' }} />
                                    <Grid container spacing={3}>
                                        {["Calm", "Sympathetic", "Sociable", "Calm"].map((c, i) =>
                                            <Grid item xs={3}>
                                                <Chip label={c} key={i} variant="outlined" style={
                                                    data.gender === "Male" ? { color: '#75B7FB', borderColor: '#75B7FB' } : { color: '#FB8D8D', borderColor: '#FB8D8D' }} />
                                            </Grid>
                                        )}
                                    </Grid> */}
                                    <div style={{ margin: '35px 0 5px 0' }}>

                                        <Grid container spacing={3}>
                                            {list.map((x, i) =>
                                                <Grid item xs={12} md={6}>
                                                    <TextField label={x.label} style={{ width: '100%' }} variant="outlined" value={x.value} InputProps={{ readOnly: true }} />
                                                </Grid>
                                            )}
                                            <Grid item xs={12}>
                                                <TextField label="Notes" style={{ width: '100%' }} multiline rows={3} variant="outlined" value={data.notes === "" ? "No specific notes" : data.notes} InputProps={{ readOnly: true }} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
})