import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, CardMedia, Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { observer } from 'mobx-react-lite'
import { favouriteList } from 'src/states/favouriteListStates';
import { sendFavDog } from 'src/states/chatStates';
import { sendMessage } from 'src/apis/chat';
import { user } from 'src/states/loginStates';

export default observer((id) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const DogList = () => {
        const [value, setValue] = useState(1);

        const handleClick = (x) => {
            let favData = {
                chatID: id.chatID,
                message: btoa(
                    JSON.stringify({
                        image: x.profileImage,
                        name: x.name,
                        id: x.id
                    })
                ),
                from: user.getID(),
                to: id.replyTo,
                messageType: "card"
            }

            sendMessage(favData)

            setTimeout(() => {
                setAnchorEl(null);
            }, 200)
        };

        const GetOption = (data, i) => {
            return (
                <Card sx={{ width: 150 }} key={i}>
                    <CardMedia
                        component="img"
                        height="150"
                        image={data.profileImage}
                        alt={data.name}
                    />
                    <Typography gutterBottom component="div" style={{ margin: '10px 0' }}>
                        {data.name}
                    </Typography>
                </Card>
            )
        }

        return (
            <div style={{ padding: 25 }}>
                <Tabs value={value} TabIndicatorProps={{
                    style: {
                        display: "none",
                    },
                }}>
                    {favouriteList.getList().map((x, i) =>
                        <Tab label={GetOption(x, i)} onClick={() => handleClick(x)} />
                    )}
                </Tabs>
            </div>
        );
    }

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <FavoriteIcon style={{ color: '#FA9CC6' }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <DogList />
            </Menu>
        </div>
    );
})