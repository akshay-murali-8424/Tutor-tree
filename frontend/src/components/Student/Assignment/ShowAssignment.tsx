import { Avatar } from 'primereact/avatar'
import { IGetClassWorkResponse } from '../../../Types/ResponseInterface'
import parse from 'html-react-parser';
import { FcFile,FcPicture } from "react-icons/fc";
import { baseUrl } from '../../../urls';
import { useGenerateAttachmentUrlMutation } from '../../../redux/Features/api/apiSlice';
import { url } from 'inspector';


function ShowAssignment({data,mt}:{data:IGetClassWorkResponse,mt:number}) {
   const displayFileIcon=(ext:string)=>{
     if(ext==="png"||ext==="jpg"||ext==="jpeg"){
        return <FcPicture size="2rem"/>
     }else{
      return <FcFile size="2rem"/>  
     }
   }

   const [generateUrl,{isLoading}] = useGenerateAttachmentUrlMutation()

   const showFile=async(key:string)=>{
    console.log(key)
       try{
         const res = await generateUrl({key}).unwrap()
         window.open(res.url,"mozillaTab")
       }catch(err:any){
        console.log(err)
       }
   }



  return (
    <div
    className={`mx-auto mt-${mt} border-round`} 

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
             {displayFileIcon(attachment.name.split('.')[1])}
              <span className="hoverText textGray text-sm"  onClick={()=>showFile(attachment.key)}>{attachment.name}</span></div>
            )
          })}
          </div>
      }
    </div>
  </div>
  )
}

export default ShowAssignment