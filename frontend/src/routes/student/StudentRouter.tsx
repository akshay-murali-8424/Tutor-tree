import { Route, Routes } from 'react-router-dom'
import ToDo from '../../pages/user/ToDo'
import NavBar from '../../components/User/UserNavBar/NavBar'


function StudentRouter() {
    return(
      <div style={{backgroundColor:"#fff"}}>
        <NavBar student/>
      <Routes>
        <Route path='/assigned' element={<ToDo/>}/>
      </Routes> 
      </div>
    )
}

export default StudentRouter