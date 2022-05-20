import react, { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import CreateIcon from '@mui/icons-material/AddBoxRounded';
import EnhancedEncryptionRoundedIcon from '@mui/icons-material/EnhancedEncryptionRounded';
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded';

import { floatingMenu } from 'src/states/floatingMenuStates';
import {observer} from 'mobx-react-lite'

const actions = [
    { icon: <CreateIcon />, name: 'Create New' },
    { icon: <ContentCutRoundedIcon />, name: '1' },
    { icon: <FileCopyIcon />, name: '2' }
];

export default observer(() => {
    const handleClick = (name) => {
        floatingMenu.setClicked(name)
    }

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
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
                {actions.map((action, i) => (
                    <SpeedDialAction
                        key={i}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleClick(action.name)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
})