import react, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

// components
import Mainbar from '../components/Mainbar'
import Home from '../components/Home'

export default observer(() => {
    return (
        <>
            <Mainbar />
            <Home />
        </>
    )
})