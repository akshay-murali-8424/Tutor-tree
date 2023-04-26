import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import FileUploader from "../../components/CreateWork/FileUploader";
import ShowAssignment from "../../components/Student/Assignment/ShowAssignment";
import YourWork from "../../components/Student/Assignment/YourWork";
import NavBar from "../../components/User/UserNavBar/NavBar";
import ShowSubmitted from "../../components/Student/Assignment/ShowSubmitted";
import { useGetClassWorkQuery } from "../../redux/Features/api/classWorkApiSlice";
import { useGetSubmissionQuery, useSubmitAssignmentMutation } from "../../redux/Features/api/submissionApiSlice";

function Assignment() {
  const {
    handleSubmit,
  } = useForm();

  let {courseId,id} = useParams<string>()
  const [files,setFiles] = useState<File[]>()
  const navigate = useNavigate()

  const [submitAssignment,{isLoading:isRequesting}] = useSubmitAssignmentMutation()

  const submitHandler = async() =>{
    const submission = new FormData()
    if(!files){
      toast.error("you didn't attached any files")
    }else{
      Object.values(files).forEach((attachments:any)=>submission.append("attachments",attachments))
    }
    try{
      if(courseId&&id){
        const res = await submitAssignment({courseId,classWorkId:id,submission}).unwrap()
        if(res.status==="success"){
            navigate(-1)
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  if(!courseId) 
  courseId=""
  if(!id){
    id=""
  }
  const {data,isLoading,isFetching,isSuccess} = useGetClassWorkQuery({courseId,id})
  const {data:submissionData} = useGetSubmissionQuery({classWorkId:id,courseId})

  if(isSuccess){
  return (
    <>
      <NavBar course={false} />
     <div className="lg:w-7 mx-auto">
     <form onSubmit={handleSubmit(submitHandler)}>
      {data &&<ShowAssignment data={data} mt={6}/> }
      {submissionData?.status==="assigned"?
       <>{files &&  <YourWork files={files}/>}</>:
       <>{submissionData?.attachments&& <ShowSubmitted attachments={submissionData?.attachments}/> }</>  
      }
      { submissionData?.status==="assigned" &&<FileUploader files={files} setFiles={setFiles}/> }
      </form>
      </div>
    </>
  );
  }else{
    return(
      <div className="flex justify-content-center" style={{marginTop:"16rem"}}>
      <ProgressSpinner />
       </div>
    )
  }
}

export default Assignment;
