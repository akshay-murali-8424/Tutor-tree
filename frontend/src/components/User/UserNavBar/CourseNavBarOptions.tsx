import { Link, useLocation, } from 'react-router-dom'

function CourseNavBarOptions() {
let streamClass:string="",workClass:string="",peopleClass:string="",messageClass:string=""
const {pathname} = useLocation()
const title = pathname.split('/')[2]
const id = pathname.split('/')[3]
switch(title){
    case "stream":
        streamClass="selectedClassOption"
        break
    case "people":
        peopleClass="selectedClassOption"  
        break
    case "work":
        workClass="selectedClassOption"  
        break
    case "messages":
        messageClass="selectedClassOption"
}
  return (
   <>
    <div className={`flex align-items-center p-3 classOption ${streamClass}`}>
      <Link to={`stream/${id}`} style={{textDecoration:"none"}} > <span className="text-sm">Stream</span></Link>
    </div>  
    <div className={`flex align-items-center p-3 classOption ${workClass}`}>
    <Link to={`work/${id}`} style={{textDecoration:"none"}}><span className="text-sm">Classwork</span></Link>
    </div>
    <div className={`flex align-items-center p-3 classOption ${peopleClass}`}>
    <Link to={`people/${id}`} style={{textDecoration:"none"}}> <span className="text-sm">People</span></Link>
    </div>
    <div className={`flex align-items-center p-3 classOption ${messageClass}`}>
    <Link to={`messages/${id}`} style={{textDecoration:"none"}}> <span className="text-sm">Messages</span></Link>
    </div>
  </>
  )
}

export default CourseNavBarOptions