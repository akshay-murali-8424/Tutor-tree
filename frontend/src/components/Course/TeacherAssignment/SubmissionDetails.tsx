import { useState } from "react";
import { IGetSubmissionsResponse } from "../../../Types/ResponseInterface";
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { useGenerateAttachmentUrlMutation } from "../../../redux/Features/api/apiSlice";
import { FcFile, FcPicture } from "react-icons/fc";

function SubmissionDetails({
  submission,
}: {
  submission: IGetSubmissionsResponse;
}) {

  const [markError,setMarkError] = useState<string>('')

  const submitHandler=(e:InputNumberChangeEvent)=>{
   if(submission?.classWork.totalMark&&e.value&&e.value>submission?.classWork.totalMark){
      setMarkError("error")
   }else{
    setMarkError('')
   }
  }

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
    <>
      <div className="p-6 flex justify-content-between">
        <div>
          <span className="text-xl accent font-semibold">
            {submission?.userId.firstName + " " + submission?.userId.lastName}
          </span>{" "}
          <br />
          <span className="text-xs textGray">{submission?.status}</span>  
        </div>
        <div>
         {submission?.status==="submitted" &&
         <div>
          {submission?.classWork.totalMark ? (
            <span className="text-lg">
              <div className="p-inputgroup">
                <InputNumber placeholder="mark" inputClassName="my-input" onChange={submitHandler}/>
                <span className="p-inputgroup-addon">Out of {submission?.classWork.totalMark} </span>
              </div>
             <span className="authErrors">{markError}</span> 
            </span>
          ) : (
            <span>Unmarked</span>
          )}
           </div>
         }
        </div>

      </div>
      <div className="pl-6">
        {submission&&submission?.status!=="assigned" && <span className="text-lg font-semibold ml-5">Submission</span> }
        {submission&&<div className="ml-5 mt-3 flex ">
          {submission.attachments.map((attachment)=>{
            return(
             <div className='lg:w-6 flex align-items-center cursor-pointer'>
             {displayFileIcon(attachment.name.split('.')[1])}
              <span className="textGray text-sm"  onClick={()=>showFile(attachment.key)}>{attachment.name}</span></div>
            )
          })}
          </div>}
      </div>
    </>
  );
}

export default SubmissionDetails;
