import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import LoginForm from "../../components/User/UserAuth/LoginForm"
import { selectuserAuth } from "../../redux/Features/reducers/userAuthSlice"


function Login() {
  const {token}=useSelector(selectuserAuth)
  if(token){
     return(
      <Navigate to={'/home'}/>
     )
  }else{
    return (
      <LoginForm/>
    )
  }
}

export default Login