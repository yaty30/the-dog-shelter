import logo from './logo.svg';
import './App.css';

// views
import HomePage from './views/HomePage'
import InternalLogin from './components/internal/InternalLogin'
import ClientLogin from './components/external/ClientLogin'

function App() {
  return (
    <HomePage />
    // <InternalLogin />
  );
}

export default App;
