import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { dogList } from 'src/states/dogStates';
import DogCard from './DogCard';
import { favouriteList } from 'src/states/favouriteListStates';

import FavouriteListDogCard from './FavouriteListDogCard';

import { observer } from 'mobx-react-lite'

export default observer(() => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(JSON.stringify(favouriteList.getList()))
    return (
        <div>
            <MenuItem onClick={handleClickOpen}>Favorite list</MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    My Favorite Dog List
                </DialogTitle>
                <List>
                    {favouriteList.getList().length === 0 ?
                        <ListItem>
                            <Button disabled style={{width: '100%',height: 150}}> No Favorite Dog in the List</Button>
                        </ListItem>
                        :
                        favouriteList.getList().map((x, i) =>
                            <>
                                <FavouriteListDogCard data={x} />
                                {favouriteList.getList().length > 1 && i !== favouriteList.getList().length - 1 && <Divider variant="middle" />}
                            </>
                        )}
                </List>
            </Dialog>
        </div>
    );
})