import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, Paper, Divider } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { searchDog } from 'src/states/dogStates';

import { observer } from 'mobx-react-lite'

import { breedList } from 'src/utils';
import SearchDogDialog from './SearchDogDialog';

export default observer(() => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [breed, setBreed] = useState("")
    const [gender, setGender] = useState("")
    const [seterillsed, setSeterillsed] = useState("")
    const [location, setLocation] = useState("")

    const open = Boolean(anchorEl);
    const locations = [
        { label: "Hong Kong Head Centre", value: "Hong Kong Head Centre" },
        { label: "Wan Chai Centre", value: "Wan Chai Centre" },
        { label: "Mong Kok Centre", value: "Mong Kok Centre" },
        { label: "Sai Kung Centre", value: "Sai Kung Centre" }
    ]

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        window.scrollTo(0, document.getElementById("paginationHook").offsetTop)

        setBreed("")
        setGender("")
        setSeterillsed("")
        setLocation("")
        searchDog.clear()
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClear = () => {
        setBreed("")
        setGender("")
        setSeterillsed("")
        setLocation("")
        searchDog.clear()
    };

    const predata = {
        breed: breed,
        gender: gender,
        seterillsed: seterillsed,
        location: location
    }

    return (
        <div>
            <IconButton
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <FilterListIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                style={{ marginTop: 15 }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Paper elevation={0}>
                    <MenuItem style={{ width: 350 }}>
                        <FormControl fullWidth>
                            <InputLabel id="breed-select-label">Breed</InputLabel>
                            <Select
                                labelId="breed-select-label"
                                value={breed}
                                label="Breed"
                                onChange={(e) => setBreed(e.target.value)}
                            >
                                {breedList().map((x, i) =>
                                    <MenuItem value={x.name} key={i}>{x.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </MenuItem>
                    <MenuItem style={{ width: 350 }}>
                        <FormControl fullWidth>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                value={gender}
                                label="Gender"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                        </FormControl>
                    </MenuItem>
                    <MenuItem style={{ width: 350 }}>
                        <FormControl fullWidth>
                            <InputLabel id="seterillsed-select-label">Seterillsed</InputLabel>
                            <Select
                                labelId="seterillsed-select-label"
                                value={seterillsed}
                                label="Seterillsed"
                                onChange={(e) => setSeterillsed(e.target.value)}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    </MenuItem>
                    <MenuItem style={{ width: 350 }}>
                        <FormControl fullWidth>
                            <InputLabel id="location-select-label">Location</InputLabel>
                            <Select
                                labelId="location-select-label"
                                value={location}
                                label="Location"
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                {locations.map((x, i) =>
                                    <MenuItem value={x.value} key={i}>{x.label}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </MenuItem>
                    <Divider variant="middle" />
                    <div style={{ padding: 15 }}>
                        <SearchDogDialog data={predata} />
                        <Button style={{ width: '100%' }} onClick={handleClear}>
                            Clear
                        </Button>
                    </div>
                </Paper>
            </Menu>
        </div >
    );
})