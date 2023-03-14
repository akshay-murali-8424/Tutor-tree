import { Route, Routes, useLocation } from 'react-router-dom'
import UserLogin from '../../pages/user/Login'
import UserRegister from '../../pages/user/Register'
import Home from '../../pages/user/Home'
import NavBar from '../../components/User/UserNavBar/NavBar'

function UserRouter() {
  const {pathname}= useLocation()
  const title = pathname.split('/')[1]
  if(title==="login"||title==="register"||!title){
    return(
      <div style={{backgroundColor:"#fff"}}>
      <Routes>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<UserRegister/>}/>
      </Routes> 
      </div>
    )
  }else{
    return (
      <div style={{backgroundColor:"#fff"}}>
        <NavBar course={false}/>
        <Routes>
          <Route path='/home' element={<Home/>}/>
        </Routes> 
      </div>
    )
  }
}

export default UserRouter
