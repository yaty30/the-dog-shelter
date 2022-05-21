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

import Slide from '@mui/material/Slide';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded';
import EditDog from './internal/EditDog'
import RemoveDialog from './internal/RemoveDialog';

import { observer } from 'mobx-react-lite'
import { floatingMenu } from 'src/states/floatingMenuStates';
import { ContrastSharp } from '@mui/icons-material';

import { dogList, editDogData } from 'src/states/dogStates';
import { user } from 'src/states/loginStates';
import { breedList } from 'src/utils';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default observer((datas) => {
    const data = datas.data
    const [open, setOpen] = useState(false);
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

    return (
        <>
            <Card sx={{ maxWidth: 415 }}>
                <div onClick={handleClickOpen} style={{ cursor: 'pointer' }}>
                    <CardMedia
                        component="img"
                        image={data.profileImage}
                        height="600"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: '"Lexend", sans-serif' }}>
                            {data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ margin: '25px 0', height: 50 }}>
                            {data.description.substring(0, 121)}...
                        </Typography>

                        <div style={{ marginTop: 15 }}>
                            <Typography>
                                <FavoriteRoundedIcon style={{ position: 'relative', top: 4, marginRight: 5, color: '#E6A62D', fontSize: 20 }} /> {getAge()} years old
                            </Typography>
                            <Typography>
                                <ScaleRoundedIcon style={{ position: 'relative', top: 4, marginRight: 5, color: '#E6A62D', fontSize: 20 }} /> {data.weight} pounds
                            </Typography>
                        </div>
                    </CardContent>
                </div>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small" onClick={handleClickOpen}>Learn More</Button>
                    {user.isClient() ? null :
                        <>
                            <EditDog datas={data} />
                            <RemoveDialog data={data.id} />
                        </>
                    }
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