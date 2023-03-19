import { Route, Routes } from 'react-router-dom'
import UserLogin from '../../pages/user/Login'
import UserRegister from '../../pages/user/Register'
import Home from '../../pages/user/Home'


function UserRouter() {
    return(
      <div style={{backgroundColor:"#fff"}}>
      <Routes>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes> 
      </div>
    )
}

export default UserRouter
