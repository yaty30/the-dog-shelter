import react, { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, CircularProgress } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavouriteList from './FavouriteList'
import LoginIcon from '@mui/icons-material/Login';
import ProfileDialog from './ProfileDialog'

import { useNavigate } from 'react-router-dom';

import { user, login } from '../states/loginStates'
import LoginDialog from './external/LoginDialog'

import { observer } from 'mobx-react-lite'

export default observer(() => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [logout, setLogout] = useState(false)
    const open = Boolean(anchorEl);

    let navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setLogout(true)
        handleClose()
        setTimeout(() => {
            user.logout()
            navigate('/')
            setLogout(false)
        }, 1200)
    }

    return (
        <div>
            {logout ?
                <IconButton style={{ marginLeft: 25 }}><CircularProgress size={20} /></IconButton>
                :
                <IconButton
                    style={{ marginLeft: 25 }}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    // onClick={handleClick}
                    onMouseOver={handleClick}
                >
                    {login.isLogin ? <AccountCircleRoundedIcon style={{color: '#3BB9EE'}} /> : <LoginIcon style={{color:'#F5973A'}}/>}
                </IconButton>
            }
            <Menu
                id="basic-menu"
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
                {login.isLogin && <ProfileDialog />}
                {user.isClient() && <FavouriteList />}
                {login.isLogin && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
                {!!!login.isLogin && <MenuItem onClick={handleLogout}>Create Account</MenuItem>}
                {!!!login.isLogin &&
                    <MenuItem style={{ width: '100%', textAlign: 'center' }}>
                        <LoginDialog />
                    </MenuItem>
                }
            </Menu>
        </div>
    );
})