import { Avatar } from 'primereact/avatar'
import { Link } from 'react-router-dom'
import { IGetClassWorkResponse } from '../../../Types/ResponseInterface'

function ClassWorkList({data,user}:{data:IGetClassWorkResponse[],user:string}) {
  const getUrl = (courseId:string,workId:string) =>{
    if(user==="student"){
      return `/course/work/${courseId}/a/${workId}`
    }else{
      return `/course/work/${courseId}/ta/${workId}`
    }
  }
    return (
      <>
     { data.map((classWork)=>{
      return(
      <Link to={getUrl(classWork.course,classWork._id)} style={{textDecoration:"none"}}>
        <div className='mt-2 assignmentCard cursor-pointer flex justify-content-between align-items-center p-3 border-round' style={{border: '0.0625rem solid #dadce0'}}>
          <div>
        <Avatar
        icon="pi pi-paperclip"
        className="primaryButt mr-2"
        shape="circle"
        style={{ color: "white" }}
        />
        <span className='accent text-sm pl-2'>{classWork.title}</span>
        </div>
        <div>
          <span className='textGray text-xs'>{classWork.dueDate?`Due on ${(new Date(classWork.dueDate)).toLocaleString("EN-IN")}`:"No due date"}</span> 
        </div>
        </div>
        </Link>
      )
     }) 
     }
      </>
    )
}

export default ClassWorkList