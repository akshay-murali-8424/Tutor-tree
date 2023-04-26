import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../../redux/Features/reducers/userAuthSlice';
import { useSignInWithGoogleMutation } from '../../../redux/Features/api/authApiSlice';



function GoogleAuthComponent() {
  const [signInWithGoogle] = useSignInWithGoogleMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSignInWithGoogle=async(credential:string)=>{
    try{
      const res= await signInWithGoogle({credential}).unwrap()  
      if(res.status==="success"){
        dispatch(setToken(res));
        navigate('/home')
      }
    }catch(err:any){
       console.log(err)
    }
  }
  return (
    <GoogleLogin width='700px'
  onSuccess={credentialResponse => {
    if(credentialResponse.credential){
      handleSignInWithGoogle(credentialResponse.credential)
    }
  }}
  onError={() => {
    console.log('Login Failed');
  }}
   />
  )
}

export default GoogleAuthComponent