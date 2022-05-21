import react, { useState, useEffect } from 'react'
import { Grid, Typography, Button, IconButton } from '@mui/material'

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Pagination from '@mui/material/Pagination';
import FilterListIcon from '@mui/icons-material/FilterList';
import Stack from '@mui/material/Stack';

// components
import DogCard from './DogCard'
import Slider from './Slider'
import FloatingMenu from './internal/FloatingMenu'
import SearchDog from './SearchDog';

import { dogList, searchDog } from 'src/states/dogStates';
import { login, user } from 'src/states/loginStates';

import { observer } from 'mobx-react-lite'

export default observer(() => {
    const [tab, setTab] = useState(0);
    const [page, setPage] = useState(1);
    const [hide, setHide] = useState(true)

    window.onscroll = function () {
        window.scrollY < 150 ? !!!hide && setHide(true) : hide && setHide(false)
    };

    const tabOptions = [
        { label: "All dogs", value: "" },
        { label: "Large", value: "L" },
        { label: "Medium", value: "M" },
        { label: "Small", value: "S" },
    ]

    const handleChange = (event, newValue) => {
        setPage(1)
        setTab(newValue);
    };


    return (
        <div>
            <Slider />
            <div style={{ margin: 25 }}>
                <div style={{ width: '100%', textAlign: 'center', margin: '45px 0' }}>
                    <Typography style={{ color: '#E6A62D', fontWeight: 'bold', fontSize: 20 }} id="floatingMenuHook">
                        ADOPT CATS
                    </Typography>
                    <Typography style={{ fontWeight: 'bold', color: '#202020', margin: '15px 0', fontSize: 45, fontFamily: '"Outfit", sans-serif' }}>
                        Bring a New Dog Home
                    </Typography>
                    <Typography>
                        Ensure your puppies get off to a great start with our company. <br />Whether you are breeding your first litter or next 'Best in Show' winner, <br />we proudly support dedicated
                        responsible dog breeders like you.
                    </Typography>
                </div>

                <Grid container spacing={3} justifyContent="center" alignItems="center" direction="row" id="paginationHook">
                    <Grid item xs={4} />
                    <Grid item xs={3}>
                        <Tabs value={tab} onChange={handleChange} centered>
                            {tabOptions.map((x, i) =>
                                <Tab label={x.label} />
                            )}
                        </Tabs>
                    </Grid>
                    <Grid item xs={4}>
                        <SearchDog />
                    </Grid>
                </Grid>

                <div style={{ padding: '0 10%', marginTop: 45 }}>
                    <Grid container spacing={6}>
                        {dogList.getDogList(tabOptions[tab].value, page).length > 0 ?
                            dogList.getDogList(tabOptions[tab].value, page).map((x, i) =>
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
                </div>

                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <Pagination
                            count={dogList.getPageNumber(tabOptions[tab].value)} variant="outlined" shape="rounded"
                            className="pagination"
                            onChange={(_, page) => {
                                if (page !== null) {
                                    setPage(page);
                                    window.scrollTo(0, document.getElementById("paginationHook").offsetTop)
                                }
                            }}
                        />
                        <div style={{ position: 'fixed', zIndex: 999, bottom: 5, right: 5, display: hide ? 'none' : 'block' }}>
                            <FloatingMenu />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
})