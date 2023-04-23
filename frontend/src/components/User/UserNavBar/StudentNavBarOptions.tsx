import { Link, useLocation, } from 'react-router-dom'

function StudentNavBarOptions() {
let assignedClass:string="",doneClass:string="",missingClass:string=""
const {pathname} = useLocation()
const title = pathname.split('/')[2]

switch(title){
    case "assigned":
        assignedClass="selectedClassOption"
        break
    case "missing":
        missingClass="selectedClassOption"  
        break
    case "done":
        doneClass="selectedClassOption"  
        break
    }

  return (
   <>
    <div className={`flex align-items-center p-3 classOption ${assignedClass}`}>
      <Link to={`assigned`} style={{textDecoration:"none"}} > <span className="text-sm">Assigned</span></Link>
    </div>  
    <div className={`flex align-items-center p-3 classOption ${missingClass}`}>
    <Link to={`missing`} style={{textDecoration:"none"}}> <span className="text-sm">Missing</span></Link>
    </div>
    <div className={`flex align-items-center p-3 classOption ${doneClass}`}>
    <Link to={`done`} style={{textDecoration:"none"}}><span className="text-sm">Done</span></Link>
    </div>
  </>
  )
}

export default StudentNavBarOptions