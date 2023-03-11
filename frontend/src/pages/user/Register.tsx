import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import RegisterForm from '../../components/User/UserAuth/RegisterForm'
import { selectuserAuth } from '../../redux/Features/reducers/userAuthSlice'

function Register() {
  const {token}=useSelector(selectuserAuth)

  if(token){
    return(
      <Navigate to={'/home'}/>
    )
  }else{
    return (
      <RegisterForm/>
    )
  }
}

export default Register