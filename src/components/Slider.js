import react, { useState } from 'react'
import { Grid, CardMedia, Typography, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'

export default observer(() => {
    return (
        <>
            {/* <CardMedia
                component="img"
                sx={{ height: 850 }}
                style={{ marginBottom: 25 }}
                image="https://www.gannett-cdn.com/media/2021/06/03/USATODAY/usatsports/imageForEntry18-8on.jpg?width=2560"
                alt="Live from space album cover"
            /> */}
            <div
                style={{
                    marginBottom: 25, marginTop: 25, height: 880, backgroundSize: 'cover',
                    backgroundImage: 'url("https://www.gannett-cdn.com/media/2021/06/03/USATODAY/usatsports/imageForEntry18-8on.jpg?width=2560")'
                }}
            >
                <Grid container spacing={3} alignItems="center" style={{ width: '100%', height: '100%' }}>
                    <Grid item xs={7} />
                    <Grid item xs={5}>
                        <Typography style={{ color: '#292929', fontWeight: 'bold', }}>
                            ANIMALS NEED
                        </Typography>
                        <Typography style={{ color: '#292929', fontWeight: 'bold', fontSize: 85, margin: '25px 0' }}>
                            Your Help!
                        </Typography>
                        <Typography style={{ color: '#292929', fontWeight: 'bold', fontSize: 15, width: '70%' }}>
                            {`You can chip in with money & effort!  Elder, Young and Even a Baby dog. Adopt Any Dog You Like!`}
                        </Typography>
                        <Button 
                            variant="contained" size="large" 
                            onClick={() =>document.getElementById('floatingMenuHook').scrollIntoView()} 
                            style={{ marginTop: 45, background: '#E6A62D', fontWeight: 'bold', height: 50, width: 180 }}
                        >
                            Browse Now
                        </Button>
                    </Grid>
                </Grid>

            </div>

        </>
    )
})