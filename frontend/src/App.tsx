import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRouter from './routes/user/UserRouter';
import CourseRouter from './routes/courses/CourseRouter';
import { Toaster } from 'react-hot-toast';

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
      </Routes>
    </Router>
    </>
  );
}

export default App;
