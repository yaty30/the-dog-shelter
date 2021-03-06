import react, { useState, useEffect } from 'react'
import { Grid, Typography, Button, CircularProgress } from '@mui/material'

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

import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import { getFavouriteList, restoreDogList } from 'src/apis/dogs';
import { restoreMessages } from 'src/apis/chat';

export default observer(() => {
    const [tab, setTab] = useState(0);
    const [page, setPage] = useState(1);
    const [hide, setHide] = useState(true)
    const [load, setLoad] = useState(true)
    let navigate = useNavigate()

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

    useEffect(() => {
        restoreDogList().then(() =>
            setTimeout(() => {
                setLoad(false)
            }, 800)
        )
        restoreMessages()
    }, [])

    return (
        <div>
            <Slider />
            <div style={{ margin: 25 }}>
                <div style={{ width: '100%', textAlign: 'center', margin: '45px 0' }}>
                    <Typography style={{ color: '#E6A62D', fontWeight: 'bold', fontSize: 20 }} id="floatingMenuHook">
                        ADOPT DOGS
                    </Typography>
                    <Typography style={{ fontWeight: 'bold', color: '#202020', margin: '15px 0', fontSize: 45, fontFamily: '"Outfit", sans-serif' }}>
                        Bring a New Dog Home
                    </Typography>
                    <Typography>
                        Ensure your puppies get off to a great start with our company. <br />Whether you are breeding your first litter or next 'Best in Show' winner, <br />we proudly support dedicated
                        responsible dog breeders like you.
                    </Typography>
                </div>

                {!!!load &&
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

                }
                <div style={{ padding: '0 10%', marginTop: 45 }}>
                    <Grid container spacing={6}>
                        {
                            load ?
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <CircularProgress />
                                </Grid>
                                :
                                dogList.getDogList(tabOptions[tab].value, page).length > 0 ?
                                    dogList.getDogList(tabOptions[tab].value, page).map((x, i) =>
                                        <Grid item xs={12} md={4} key={i}>
                                            <DogCard data={x} dogIndex={page > 1 ? i + (page * 3) : i} />
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
                        {!!!load &&
                            <>
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

                                {user.username !== "" &&
                                    <div style={{ position: 'fixed', zIndex: 999, bottom: 5, right: 5, display: hide ? 'none' : 'block' }}>
                                        <FloatingMenu />
                                    </div>
                                }
                            </>
                        }
                    </Grid>
                    <Grid item xs={12} style={{ background: '#f1f1f1', minHeight: 100, marginTop: 25, textAlign: 'center' }}>
                            <Typography style={{marginTop: 65,color: '#999'}}>The Canine Shelter @ 2022</Typography>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
})