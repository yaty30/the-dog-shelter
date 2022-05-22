import react, { useState, forwardRef } from 'react';
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
import DialogTitle from '@mui/material/DialogTitle';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Slide from '@mui/material/Slide';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded';
import EditDog from './internal/EditDog'
import RemoveDialog from './internal/RemoveDialog';

import { floatingMenu } from 'src/states/floatingMenuStates';
import { ContrastSharp, DataArrayRounded } from '@mui/icons-material';

import { dogList, editDogData } from 'src/states/dogStates';
import { user } from 'src/states/loginStates';
import { favouriteList } from 'src/states/favouriteListStates';
import { breedList } from 'src/utils';

import { IconButton } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { observer } from 'mobx-react-lite'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default observer((datas) => {
    const data = datas.data
    const [open, setOpen] = useState(false);
    const [isFavourite, setIsFavourite] = useState(favouriteList.onList(data.id))
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleEdit = () => {
        floatingMenu.setClicked("Edit dog")
        console.log(data)
        editDogData.prepareEditData(data)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const date = new Date()

    const addSpace = (val) => {
        const one = val.substring(0, 3)
        const two = val.substring(3, 6)
        const three = val.substring(6, 9)

        return `${one} ${two} ${three}`
    }

    const getAge = () => {
        let today = new Date();
        let birthDate = new Date(data.birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const list = [
        { label: "Gender", value: data.gender, set: "" },
        { label: "Breed", value: data.breed, set: "" },
        { label: "Birthday", value: `${data.birthday} (${getAge()} years old)`, set: "" },
        { label: "Size", value: data.size === "L" ? "Large" : data.size === "M" ? "Medium" : "Small", set: "" },
        { label: "Mircochip No", value: addSpace(data.mircochipNo), set: "" },
        { label: "Seterillsed", value: data.seterillsed ? "Yes" : "No", set: "" },
        { label: "Intake", value: data.intake, set: "" },
        { label: "Location", value: data.location, set: "" },
    ]

    const handleFavourite = () => {
        console.log(data.id)
        favouriteList.onList(data.id) ? favouriteList.removeFavourite(data.id) : favouriteList.addFavourite(data.id)
    }

    return (
        <>
            <div>
                <ListItem alignItems="flex-start">
                    <ListItemButton onClick={handleClickOpen}>
                        <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src={data.profileImage} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={data.name}
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {data.breed}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItemButton>
                </ListItem>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <List>
                        {favouriteList.getList().map((x, i) =>
                            <ListItem alignItems="flex-start">
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar alt="Cindy Baker" src={x.profileImage} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={x.name}
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {x.breed}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        )}
                        <Divider variant="middle" />
                    </List>
                </Dialog>
            </div>
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