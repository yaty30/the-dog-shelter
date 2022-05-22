import react, { useState } from 'react';
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

export default observer(() => {
  const [load, setLoad] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  let navigate = useNavigate()

  const handleLogin = () => {
    let userData = {
      id: username === "worker" ? 1 : 0,
      username: "Tester",
      userType: username,
      loginDate: "",
      loginTime: ""
    }

    setLoad(true)
    user.setData(userData)
    setTimeout(() => {
      navigate("/home")
      setLoad(false)
    }, 1200)
  }

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" direction="row">
      <Grid item xs={3}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2022-01/220128-chihuahua-mb-0853-a252ab.jpg"
            alt="The Canine Shelte"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', marginBottom: 15 }}>
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
              onClick={handleLogin}
              style={{ width: '100%' }}
            // disabled={load} 
            >
              {load ? <CircularProgress size={25} style={{ color: '#fff' }} /> : "LOGIN"}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
})
