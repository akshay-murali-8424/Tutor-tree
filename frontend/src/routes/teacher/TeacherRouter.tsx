import { Route, Routes } from 'react-router-dom'
import ToReview from '../../pages/user/ToReview'
import NavBar from '../../components/User/UserNavBar/NavBar'
import Reviewed from '../../pages/user/Reviewed'


function TeacherRouter() {
    return(
      <div style={{backgroundColor:"#fff"}}>
        <NavBar teacher/>
      <Routes>
        <Route path='/to-review' element={<ToReview/>}/>
        <Route path='/reviewed' element={<Reviewed/>}/>
      </Routes> 
      </div>
    )
}

export default TeacherRouter