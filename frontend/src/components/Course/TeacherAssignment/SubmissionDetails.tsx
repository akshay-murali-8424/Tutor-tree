import { useState } from "react";
import { IGetSubmissionsResponse } from "../../../Types/ResponseInterface";
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';

function SubmissionDetails({
  submission,
}: {
  submission: IGetSubmissionsResponse | undefined;
}) {

  const [markError,setMarkError] = useState<string>('')

  const submitHandler=(e:InputNumberChangeEvent)=>{
   if(submission?.classWork.totalMark&&e.value&&e.value>submission?.classWork.totalMark){
      setMarkError("error")
   }else{
    setMarkError('')
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
        {submission?.attachments && submission.attachments}
      </div>
    </>
  );
}

export default SubmissionDetails;
