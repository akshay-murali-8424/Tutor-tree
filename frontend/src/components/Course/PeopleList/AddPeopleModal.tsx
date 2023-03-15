import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAddStudentMutation, useAddTeacherMutation, useFindUserByEmailMutation } from "../../../redux/Features/api/apiSlice";
import { toast } from "react-hot-toast";
import { UserInterface } from "../../../Types/UserInterface";
import { Avatar } from "primereact/avatar";
import { useParams } from "react-router-dom";

function AddPeopleModal({peopleVisible,setPeopleVisible,type}:{peopleVisible:boolean,setPeopleVisible:Dispatch<SetStateAction<boolean>>,type:"Teacher"|"Student"}) {
  const schema = yup.object().shape({
    email: yup.string().required().email()
  });

  const [addPeopleVisible,setAddPeopleVisible] = useState<boolean>(false) 

  let {id:courseId}=useParams<string>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{email:string}>({
    resolver: yupResolver(schema),
  });

  const [findUserByEmail,{isLoading}] = useFindUserByEmailMutation()

  const [addTeacher,{isLoading:isAddTeacherLoading}] = useAddTeacherMutation()
  const [addStudent,{isLoading:isAddStudentLoading}] = useAddStudentMutation()


  const [user,setUser] = useState<UserInterface>()
  
  const findSubmitHandler=async(data:{email:string})=>{
    if(!isLoading){
      try{
        const res = await findUserByEmail(data).unwrap()
        reset()
        setUser(res)
        setAddPeopleVisible(true)
      }catch(err:any){
        toast.error(err.data.message)
      }
    }
  }

  const addNewStudent=async()=>{
    if(!isAddStudentLoading){
      try{
        if(courseId&&user?._id){
          const res =await addStudent({courseId,userId:user._id}).unwrap()
          toast.success(`New Student added`)
          setAddPeopleVisible(false)
        }
      }catch(err:any){
         toast.error(err.data.message)
      }
    }
  }

  const addNewTeacher=async()=>{
     if(!isAddTeacherLoading){
      try{
        if(courseId&&user?._id){
          const res =await addTeacher({courseId,userId:user._id}).unwrap()
          toast.success(`New Teacher added`)
          setAddPeopleVisible(false)
        }
      }catch(err:any){
         toast.error(err.data.message)
      }
     }
  }

  const addPeople=async()=>{
      if(type==="Teacher"){
        await addNewTeacher()
      }else{
        await addNewStudent()
      }
  }

  return (
    <div className="card flex justify-content-center">
        <Dialog header={`Add ${type}`}  className='accent' visible={peopleVisible} style={{ width: '30vw' }} onHide={() => {reset();  setPeopleVisible(false)}}>
        <form onSubmit={handleSubmit(findSubmitHandler)}>
            
            <div className="flex flex-column gap-2">
            <label htmlFor="Email" className="accent">Email</label>
            <InputText id="email" aria-describedby="name-help" className="my-input" {...register("email")}/>
            <small className="authErrors">
                {errors.email?.message}
            </small>
          </div>
           <div className='flex justify-content-end mt-3'>
           <Button label={`Add ${type}`} className='textButt' text />
           </div>
            </form>
        </Dialog>
        <Dialog header={`Add ${user?.firstName} as ${type}`}  className='accent' visible={addPeopleVisible} style={{ width: '30vw' }} onHide={() => {reset();  setAddPeopleVisible(false)}}>
            <div>
            <Avatar
          label={user?.firstName[0]}
          size="large"
          className="primaryButt mr-2"
          shape="circle"
          style={{ color: "white" }}
            />
            <span className="accent text-lg ml-2 ">{user?.firstName+" "+user?.lastName}</span>
            </div>
            <div className="flex justify-content-end mt-2">
           <Button label={`Confirm`} className='textButt' text  onClick={addPeople}/>
            </div>
        </Dialog>
    </div>
  )
}

export default AddPeopleModal