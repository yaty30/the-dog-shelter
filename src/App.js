import logo from './logo.svg';
import react, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { login } from './states/loginStates';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

// views
import HomePage from './views/HomePage'
import InternalLoginHome from './components/external/LoginHome'
import MessageBar from './components/general/MessageBar'

function App() {
  return (
    <>
      <MessageBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InternalLoginHome />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default observer(() => {
  // let navigate = useNavigate()
  // useEffect(() => {
  //   !!!login.isLogin && navigate("/")
  // }, [login.isLogin])

  return (
    <App />
  )
});
