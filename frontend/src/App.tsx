import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './pages/user/Login';
import UserRegister from './pages/user/Register';
import Home from './pages/user/Home';
import Course from './pages/Course/Course';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/course/:id' element={<Course/>}/>
      </Routes>
    </Router>
  );
}

export default App;
