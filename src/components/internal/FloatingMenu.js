import react, { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import CreateIcon from '@mui/icons-material/AddBoxRounded';
import EnhancedEncryptionRoundedIcon from '@mui/icons-material/EnhancedEncryptionRounded';
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded';
import CreateNew from './CreateNew';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

import ChatDialog from '../instantChat/ChatDialog'

import { login, user } from 'src/states/loginStates';

import { floatingMenu } from 'src/states/floatingMenuStates';
import { observer } from 'mobx-react-lite'

const clientActions = [
    { icon: <HelpCenterIcon />, name: 'Chat', },
    // { icon: <FileCopyIcon />, name: '2', },
];

const workerActions = [
    { icon: <CreateIcon />, name: 'Create New', },
    { icon: <HelpCenterIcon />, name: 'Chat', },
    // { icon: <FileCopyIcon />, name: '2', },
];

export default observer(() => {
    const handleClick = (name) => {
        floatingMenu.setClicked(name)
    }

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <CreateNew />
            <ChatDialog />
            <SpeedDial
                ariaLabel="SpeedDial basic"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                FabProps={{
                    sx: {
                        bgcolor: '#E6A62D',
                        '&:hover': {
                            bgcolor: '#E6A62D',
                        }
                    }
                }}
                icon={<SpeedDialIcon />}
            >
                {login.isLogin === false || user.isClient() ?
                    clientActions.map((action, i) => (
                        <SpeedDialAction
                            key={i}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => handleClick(action.name)}
                        />
                    ))
                    :
                    workerActions.map((action, i) => (
                        <SpeedDialAction
                            key={i}
                            icon={action.icon}
                            tooltipTitle={action.name === "Chat" ? "Instant Chat" : action.name}
                            onClick={() => handleClick(action.name)}
                        />
                    ))    
            }
            </SpeedDial>
        </Box>
    );
})