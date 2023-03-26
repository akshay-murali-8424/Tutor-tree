import { Button } from "primereact/button"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import TeacherAssignmentSideBar from "../../components/Course/TeacherAssignment/TeacherAssignmentSideBar"
import NavBar from "../../components/User/UserNavBar/NavBar"
import { selectuserAuth } from "../../redux/Features/reducers/userAuthSlice"

function TeacherAssignment() {
  const {token}=useSelector(selectuserAuth)

  if(token){
     return(
        <>
        <NavBar course={false}/>
        <div className="p-2 pl-4" style={{border: '0.0625rem solid #dadce0'}}>
          <Button className="primaryButt" disabled>Return</Button>
        </div>
        <div className="flex" style={{minHeight:"85.5vh"}}>
           <TeacherAssignmentSideBar/>
           <div className="lg:w-9">
            
           </div>
        </div>
        </>
     )
  }else{
      return (
        <Navigate to={'/login'}/>
      )
  }
}

export default TeacherAssignment