import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import SendRounded from '@mui/icons-material/SendRounded';
import { getMessages, createN, createNewChat } from 'src/apis/chat';
import { observer } from 'mobx-react-lite'
import { randomString, getDatetime, randomNumber } from 'src/utils';
import { login, tempUser, user } from 'src/states/loginStates';

export default observer(() => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [message, setMessage] = useState("")
    const [load, setLoad] = useState(false)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSend = () => {
        setLoad(true)
        let data = {
            message: message,
            from: user.getID()
        }
        createNewChat(data).then(() => {
            setTimeout(() => {
                setLoad(false)
                setMessage("")
                setAnchorEl(null);
                // getMessages(chatID)
            }, 1100)
        })
    }

    return (
        <div>
            <Button
                variant={user.isClient() ? "outlined" : "text"}
                color="inherit"
                style={{ color: '#666', height: 50 }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                disabled={!!!user.isClient()}
            >
                {user.isClient() ? "Start a new chat" : "No message yet"}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                style={{
                    marginTop: 15
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <TextField
                    variant="outlined" label="Message"
                    multiline
                    disabled={load}
                    style={{ margin: 15, width: 450 }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                {load ?
                                    <CircularProgress size={22} />
                                    :
                                    <IconButton disabled={message === "" || message.match(/^ *$/) !== null} onClick={handleSend}>
                                        <SendRounded style={{ color: message === "" || message.match(/^ *$/) !== null ? '#f1f1f1' : '#333' }} />
                                    </IconButton>
                                }
                            </InputAdornment>,
                    }}
                />
            </Menu>
        </div>
    );
})