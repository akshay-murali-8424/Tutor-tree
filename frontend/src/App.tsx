import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './pages/user/Login';
import UserRegister from './pages/user/Register';
import Home from './pages/user/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
