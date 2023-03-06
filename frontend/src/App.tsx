import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './pages/user/Login';
import UserRegister from './pages/user/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<UserRegister/>}/>
      </Routes>
    </Router>
  );
}

export default App;
