import Course from '../../pages/Course/Stream'
import { Route, Routes } from 'react-router-dom'
import NavBar from '../../components/User/UserNavBar/NavBar'
import People from '../../pages/Course/People'
import ClassWork from '../../pages/Course/ClassWork'

function CourseRouter() {
  return (
    <div>
      <NavBar course={true}/>
        <Routes>
        <Route path='stream/:id' element={<Course/>}/>
        <Route path='people/:id' element={<People/>}/>
        <Route path='work/:id' element={<ClassWork/>}/>
      </Routes>   
    </div>
  )
}

export default CourseRouter