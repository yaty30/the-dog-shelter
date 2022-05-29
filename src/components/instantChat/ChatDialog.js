import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { instantChat } from 'src/states/globalDialogStates';
import { floatingMenu } from 'src/states/floatingMenuStates';
import { Grid, Chip, TextField, Tooltip, InputAdornment, IconButton, Divider, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import StartNewChat from './StartNewChat'

import { chatMessages, messages } from 'src/states/chatStates';

import { observer } from 'mobx-react-lite'
import { login, tempUser, user } from 'src/states/loginStates';
import { getDatetime } from 'src/utils';
import { deleteMessage, getMessages, sendMessage } from 'src/apis/chat';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default observer(() => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleClose = () => {
        floatingMenu.cancle()
    };

    const handleDelete = () => {
        console.info('You clicked the Chip.');
    };

    const dummyData = [
        { value: "", sentByCurrentUser: false }, { value: "", sentByCurrentUser: false },
        { value: "", sentByCurrentUser: true }, { value: "", sentByCurrentUser: true },
        { value: "", sentByCurrentUser: true }, { value: "", sentByCurrentUser: true },
        { value: "", sentByCurrentUser: false }, { value: "", sentByCurrentUser: false },
        { value: "", sentByCurrentUser: false }, { value: "", sentByCurrentUser: true }
    ]

    const DeleteButton = (id) => {
        const handleDelete = () => {
            let delData = {
                chatID: chatMessages.getChats()[tab],
                messageID: id.id
            }
            deleteMessage(delData)
        }

        return (
            <IconButton onClick={() => handleDelete(id.id)}>
                <DeleteForeverRoundedIcon style={{ fontSize: 23, color: '#fff' }} />
            </IconButton>
        )
    }

    const handleSendMessage = () => {
        let data = {
            chatID: chatMessages.getChats()[tab],
            message: msg,
            from: user.getID(),
            to: chatMessages.getReplyTo(chatMessages.getChats()[tab]),
        }
        sendMessage(data).then(() => {
            setMsg("")
        })
    }

    const sort = (arr) => {
        return arr.sort(function (a, b) {
            return a.orderID - b.orderID
        });
    }

    return (
        <div>
            <Dialog
                open={floatingMenu.clickedMenu === "Chat"}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
            >
                {chatMessages.messages.length === 0 ?
                    <DialogContent>
                        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" style={{ height: 500 }}>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <StartNewChat />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    :
                    <>
                        <DialogTitle id="alert-dialog-title">
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                                        {chatMessages.getChats().map((x, i) =>
                                            <Tab label={`Chat Room ${i + 1}`} {...a11yProps(i)} />
                                        )}
                                    </Tabs>
                                </Box>
                            </Box>
                        </DialogTitle>
                        <DialogContent style={{ padding: '10px 35px', overflow: 'hidden' }}>
                            <Grid container spacing={3} className="chatDialogDiv">
                                <Grid item xs={12}>
                                    {chatMessages.getChats().map((x, i) =>
                                        <TabPanel value={tab} index={i}>
                                            {console.log(JSON.stringify(sort(chatMessages.getMessagesByChatID(x))))}
                                            <Grid container spacing={3}>
                                                {sort(chatMessages.getMessagesByChatID(x)).map((m, mi) =>
                                                    <>
                                                        {(m.from === user.id) && <Grid item xs={7} />}
                                                        <Grid item xs={5} style={{ textAlign: m.from === user.id ? 'right' : 'left' }}>
                                                            <Tooltip title={login.isLogin && user.isClient() ? "" : <DeleteButton id={m.messageID} />} placement={m.from === user.id ? "right" : "left"} arrow disabled>
                                                                <TextField
                                                                    variant="outlined" size="small"
                                                                    style={{ width: '100%', cursor: 'default', background: '#f1f1f1' }}
                                                                    className="chatMessage"
                                                                    InputProps={{
                                                                        readOnly: true
                                                                    }}
                                                                    multiline value={`${m.message}`}
                                                                />
                                                            </Tooltip>
                                                            <Typography style={{ color: '#aaa', fontSize: 11, padding: '0 5px', marginTop: 3, textTransform: 'uppercase' }}>{m.time}</Typography>
                                                        </Grid>
                                                        {(m.from !== user.id) && <Grid item xs={7} />}
                                                    </>
                                                )}
                                            </Grid>
                                        </TabPanel>
                                    )}
                                </Grid>

                            </Grid>
                            <Divider style={{ marginTop: 15, position: 'relative', top: 10 }} />
                        </DialogContent>
                        <DialogActions>
                            <div style={{ padding: '10px 15px', width: '100%' }}>
                                <TextField
                                    label="Message"
                                    id="outlined-start-adornment"
                                    sx={{ width: '100%' }}
                                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleSendMessage}>
                                                    <SendRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                />
                            </div>
                        </DialogActions>
                    </>
                }

            </Dialog>
        </div>
    );
})