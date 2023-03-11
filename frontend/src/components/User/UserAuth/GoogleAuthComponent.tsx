import { GoogleLogin } from '@react-oauth/google';


function GoogleAuthComponent() {
  return (
    <GoogleLogin width='700px'
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
   />
  )
}

export default GoogleAuthComponent