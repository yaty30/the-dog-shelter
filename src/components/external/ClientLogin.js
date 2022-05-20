import react, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, CircularProgress, TextField, Box } from '@mui/material';

import { observer } from 'mobx-react-lite'

export default observer(() => {
  const [load, setLoad] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" direction="row" style={{ height: '100vh' }}>
      <Grid item xs={5}>
        <Card sx={{ display: 'flex', height: 500 }}>
          <CardMedia
            component="img"
            sx={{ width: 400 }}
            image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*"
            alt="Live from space album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
            <div style={{marginTop: 95}}>
              <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', marginBottom: 15, position: 'relative', bottom: 40 }}>
                Login
              </Typography>
              <TextField
                size="small" type="text" label="Username"
                variant="outlined" style={{ marginBottom: 25, width: '100%' }}
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                size="small" type="password"
                label="Password" variant="outlined"
                style={{ marginBottom: 25, width: '100%' }}
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => setLoad(!load)}
                style={{ width: '100%', marginTop: 55 }}
              // disabled={load} 
              >
                {load ? <CircularProgress size={25} style={{ color: '#fff' }} /> : "LOGIN"}
              </Button>

              <Button style={{textTransform: 'none', marginTop: 25, width: '100%'}}>
                Forgot Password
              </Button>
            </div>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
})
