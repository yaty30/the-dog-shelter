import logo from './logo.svg';
import './App.css';

// views
import HomePage from './views/HomePage'
import InternalLoginHome from './components/external/LoginHome'
import MessageBar from './components/general/MessageBar'

function App() {
  return (
    // <HomePage />
    <>
      <MessageBar />
      <InternalLoginHome />
    </>
  );
}

export default App;
