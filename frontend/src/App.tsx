import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRouter from './routes/user/UserRouter';
import CourseRouter from './routes/courses/CourseRouter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<UserRouter/>}/>
        <Route path='/course/*' element={<CourseRouter/>}/>
      </Routes>
    </Router>
  );
}

export default App;
