import { Link, useLocation, } from 'react-router-dom'

function TeacherNavBarOptions() {
let toReviewClass:string="",reviewedClass:string=""
const {pathname} = useLocation()
const title = pathname.split('/')[2]
switch(title){
    case "to-review":
        toReviewClass="selectedClassOption"
        break
    case "reviewed":
        reviewedClass="selectedClassOption"  
        break
   }
  return (
   <>
    <div className={`flex align-items-center p-3 classOption ${toReviewClass}`}>
      <Link to={`to-review?course=all`} style={{textDecoration:"none"}} > <span className="text-sm">To Review</span></Link>
    </div>  
    <div className={`flex align-items-center p-3 classOption ${reviewedClass}`}>
    <Link to={`reviewed?course=all`} style={{textDecoration:"none"}}><span className="text-sm">Reviewed</span></Link>
    </div>
  </>
  )
}

export default TeacherNavBarOptions