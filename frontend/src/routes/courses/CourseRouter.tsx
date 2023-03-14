import Course from '../../pages/Course/Stream'
import { Route, Routes } from 'react-router-dom'
import NavBar from '../../components/User/UserNavBar/NavBar'
import People from '../../pages/Course/People'

function CourseRouter() {
  return (
    <div>
      <NavBar course={true}/>
        <Routes>
        <Route path='stream/:id' element={<Course/>}/>
        <Route path='people/:id' element={<People/>}/>
      </Routes>   
    </div>
  )
}

export default CourseRouter