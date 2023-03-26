import { Avatar } from 'primereact/avatar'
import { IGetClassWorkResponse } from '../../../Types/ResponseInterface'
import parse from 'html-react-parser';
import { FcFile,FcPicture } from "react-icons/fc";
import { baseUrl } from '../../../urls';


function ShowAssignment({data}:{data:IGetClassWorkResponse}) {
   const displayFileIcon=(ext:string)=>{
     if(ext==="png"||ext==="jpg"||ext==="jpeg"){
        return <FcPicture size="2rem"/>
     }else{
      return <FcFile size="2rem"/>  
     }
   }



  return (
    <div
    className=" mx-auto mt-6 border-round "

  >
    <div className="col-12 border-round mb-5 p-4" style={{border: '0.0625rem solid #dadce0'}}>
      <div className="flex justify-content-between ">
        <div>
          <div>
            <Avatar
              icon="pi pi-paperclip"
              className="primaryButt mr-1"
              shape="circle"
              style={{ color: "white" }}
            />
            <span className="primary text-xl">{data.title}</span>
          </div>
          <div>
            <span
              className="text-sm textGray"
              style={{ marginLeft: "2.5rem" }}
            >
             {`${data.assignedBy.firstName} ${data.assignedBy.lastName} . ${(new Date(data.postedOn)).toLocaleString("EN-IN",{
          weekday: "short",
           year: "numeric",
           month: "short",
            day: "numeric"
          })}`}
            </span>
          </div>
        </div>
        <div className="mt-5">
          <span className="text-sm">{data.dueDate?`Due on ${(new Date(data.dueDate)).toLocaleString("EN-IN")}`:"No due date"}</span>
        </div>
      </div>
    {data.description&&<div className="ml-5 mt-3">
       {parse(data.description)}
      </div> }
      {
        data.attachments&&<div className="ml-5 mt-3 flex ">
          {data.attachments.map((attachment)=>{
            return(
             <div className='lg:w-6 flex align-items-center cursor-pointer'> 
             {displayFileIcon(attachment.split('.')[1])}
             <a target="_blank" rel="noreferrer" href={`${baseUrl}/courses/stream-attachment/${attachment}`} style={{textDecoration:"none"}}><span className="textGray text-sm">{attachment}</span></a></div>
            )
          })}
          </div>
      }
    </div>
  </div>
  )
}

export default ShowAssignment