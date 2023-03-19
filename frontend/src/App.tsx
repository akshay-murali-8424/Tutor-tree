import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRouter from './routes/user/UserRouter';
import CourseRouter from './routes/courses/CourseRouter';
import { Toaster } from 'react-hot-toast';
import CreateWork from './pages/Course/CreateWork';

function App() {
  return (
    <>
 <Toaster
  toastOptions={{
    success: {
      style: {
        background: '#cbe7ea',
        fontSize:"15px"
      },
      position:"top-right"
    },
    error: {
      style: {
        background: '#e39fa8',
      },
      position:"top-right"
    },
  }}
/>
    <Router>
      <Routes>
        <Route path='/*' element={<UserRouter/>}/>
        <Route path='/course/*' element={<CourseRouter/>}/>
        <Route path='/course/create/:id' element={<CreateWork/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
