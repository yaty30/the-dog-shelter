import react, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, CircularProgress, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom";
import { user } from '../../states/loginStates'

import { login } from '../../apis/login'
import { restoreDogList, getFavouriteList } from 'src/apis/dogs';
import { getMessageByID } from 'src/apis/chat';
import { cesar } from 'src/utils';

export default observer(() => {
  const [load, setLoad] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  let navigate = useNavigate()

  useEffect(() => {
    setUsername("")
    setPassword("")
  }, [])

  const handleLogin = () => {
    let data = {
      email: username,
      password: btoa(password)
    }

    setLoad(true)

    login(data).then(x => {
      if (x) {
        restoreDogList()
        navigate("/home")
      }
      setTimeout(() => {
        setLoad(false)
      }, 1200)
    })

  }

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" direction="row">
      <Grid item xs={12}>
        <Card>
          <CardMedia
            component="img"
            height="250"
            image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2022-01/220128-chihuahua-mb-0853-a252ab.jpg"
            alt="The Canine Shelte"
          />
          <CardContent style={{ padding: '5px 55px 55px 55px' }}>
            <Typography style={{ fontSize: 25, fontWeight: 'bold', width: '100%', textAlign: 'center', margin: '25px 0' }}>
              LOGIN
            </Typography>
            <TextField
              size="small" type="text" label="Username"
              variant="outlined" style={{ marginBottom: 25, width: '100%' }}
              value={username} onChange={(e) => setUsername(e.target.value)}
              disabled={load}
            />
            <TextField
              size="small" type="password"
              label="Password" variant="outlined"
              style={{ marginBottom: 25, width: '100%' }}
              onKeyPress={() => username !== "" || password !== "" && handleLogin()}
              value={password} onChange={(e) => setPassword(e.target.value)}
              disabled={load}
            />
            <Button
              variant="contained"
              onClick={handleLogin}
              style={{ width: '100%' }}
              size="large"
              disabled={load || username === "" || password === ""}
            >
              {load ? <CircularProgress size={25} style={{ color: '#fff' }} /> : "LOGIN"}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
})
