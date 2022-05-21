import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';
import DogCard from './DogCard';
import { dogList, searchDog } from 'src/states/dogStates';

import { observer } from 'mobx-react-lite'

export default observer((datas) => {
    const data = datas.data
    const [open, setOpen] = useState(false);

    const isEmpty = searchDog.breed === "" && searchDog.gender === "" && searchDog.seterillsed === "" && searchDog.location === ""

    const handleSearch = () => {
        setOpen(true);
        searchDog.setBreed(data.breed)
        searchDog.setGender(data.gender)
        searchDog.setSeterillsed(data.seterillsed)
        searchDog.setLocation(data.location)
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button variant="contained" style={{ width: '100%' }} onClick={handleSearch} >
                Search
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xl"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={6}>
                            {dogList.searchDog().length > 0 ?
                                dogList.searchDog().map((x, i) =>
                                    <Grid item xs={12} md={4} key={i}>
                                        <DogCard data={x} />
                                    </Grid>
                                )
                                :
                                <Grid item xs={12}>
                                    <Button disabled style={{ width: '100%' }}>No result</Button>
                                </Grid>
                            }
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
})