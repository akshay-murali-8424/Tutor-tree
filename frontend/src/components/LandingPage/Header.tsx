import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='flex justify-content-between p-3'>
       <div className='ml-5'>
       <span style={{fontSize:"larger", color:"var(--accent)"}}>Tutor Tree</span>
       </div>
       <div className='mr-5'>
        <Link to={"/login"} style={{textDecoration:"none"}}> <Button className='mr-3 textButt' text>Sign in</Button></Link>
        <Link to={"/register"} style={{textDecoration:"none"}}> <Button className='primaryButt'>Sign up</Button></Link>
       </div>
    </div>
  )
}

export default Header