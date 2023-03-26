import CreateWorkNavBar from "../../components/CreateWork/CreateWorkNavBar"
import FileUploader from "../../components/CreateWork/FileUploader"
import TextEditor from "../../components/CreateWork/TextEditor"
import WorkAssignBar from "../../components/CreateWork/WorkAssignBar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateClassWorkMutation } from "../../redux/Features/api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required(),
});


function CreateWork() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{title:string,totalMark:number}>({
    resolver: yupResolver(schema),
  });

const [attachments,setAttachments] = useState<any>()
let [dueDate, setDueDate] = useState<string | Date | undefined | Date[]>();
const [description, setDescription] = useState<string>();

const {id:courseId}=useParams<string>()
const navigate = useNavigate()

const [createClassWork,{isLoading}] = useCreateClassWorkMutation()

const submitHandler = async(data:{title:string,totalMark:number | string})=>{
  if(!isLoading){
    try {
      if(courseId){
        const classWork = new FormData();
          classWork.append("title",data.title)
          if(data.totalMark){
            data.totalMark = data.totalMark+""
            classWork.append("totalMark",data.totalMark)
          }
          if(description){
            classWork.append("description",description)
          }
          if(attachments){
            Object.values(attachments).forEach((attachments:any)=>classWork.append("attachments",attachments))
          }
          if(dueDate){
            dueDate = dueDate + ""
            classWork.append("dueDate",dueDate)
          }
        const res = await createClassWork({courseId,classWork}).unwrap()
        if(res.status==="success"){
           navigate(-1)
        }
      }
    }catch(err:any){
      console.log(err)
    }
  }
}


  return (  
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
    <CreateWorkNavBar />
    <div className="flex">
      <div className="lg:w-10 grayBackground p-5" style={{ 
      borderRight: "0.0625rem solid #e0e0e0", minHeight:"92vh"}}>
        <div className="lg:w-9 mx-auto border-round" style={{backgroundColor:"#fff",
        border: "0.0625rem solid #e0e0e0"}}>
         <TextEditor register={register} errors={errors} value={description} setValue={setDescription}/>
        {attachments && <span className="p-4 accent text-sm">Attachments</span> }
         {attachments && attachments.map((file:any)=>{
              return (
                <div className="pl-4 pb-2">
                <span className="text-sm primary"> {file.name}</span>
                </div>
              )   
            })}
        </div>
        <div className="lg:w-9 mx-auto my-4 border-round p-4" style={{backgroundColor:"#fff",
        border: "0.0625rem solid #e0e0e0"}}>
         <FileUploader files={attachments} setFiles={setAttachments}/>
        </div>
      </div>
      <div className="p-4">
         <WorkAssignBar datetime12h={dueDate} setDateTime12h={setDueDate} register={register} errors={errors}/>
      </div>
    </div>
      </form>
    </>
  )
}

export default CreateWork