import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRouter from './routes/user/UserRouter';
import CourseRouter from './routes/courses/CourseRouter';
import { Toaster } from 'react-hot-toast';
import CreateWork from './pages/Course/CreateWork';
import Assignment from './pages/Course/Assignment';
import TeacherAssignment from './pages/Course/TeacherAssignment';
import StudentRouter from './routes/student/StudentRouter';
import TeacherRouter from './routes/teacher/TeacherRouter';


function App() {
  return (
    <>
 <Toaster
  toastOptions={{
    success: {
      style: {
        background: '#E8E9EB',
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
        <Route path='/s/*' element={<StudentRouter/>}/>
        <Route path='/t/*' element={<TeacherRouter/>}/>
        <Route path='/course/*' element={<CourseRouter/>}/>
        <Route path='/course/create/:id' element={<CreateWork/>}/>
        <Route path='/course/work/:courseId/a/:id' element={<Assignment/>}/>
        <Route path='/course/work/:courseId/ta/:id' element={<TeacherAssignment/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
