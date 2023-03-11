import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dispatch, SetStateAction, useState } from 'react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { useCreateClassMutation } from '../../../redux/Features/api/apiSlice';
import { ICreateCoursePayload } from '../../../Types/PayloadInterface';
import { IBasicResponse } from '../../../Types/ResponseInterface';


const schema = yup.object().shape({
    name: yup.string().required(),
    section: yup.string().required(),
    subject: yup.string().required()
});

function CreateClass({createVisible, setCreateVisible}:{createVisible:boolean,setCreateVisible:Dispatch<SetStateAction<boolean>>}) {
    const {
        register,
        handleSubmit,
        reset,
        formState:{ errors },
      } = useForm<ICreateCoursePayload>({
        resolver: yupResolver(schema),
      });

      const [createClass,{isLoading}]=useCreateClassMutation()


  const [reqError,setReqError]=useState('')

  const submitHandler =async (data:ICreateCoursePayload) => {
    if(!isLoading){
      try{
        const res:IBasicResponse = await createClass(data).unwrap()
        if(res.status ==='success'){
          setCreateVisible(false)
        }
      }catch(err:any){
        setReqError(err.data.message)
      }
    }
  };

  return (
    <div className="card flex justify-content-center">
        <Dialog header="Create Class"  className='accent' visible={createVisible} style={{ width: '30vw' }} onHide={() => {reset(); setCreateVisible(false)}}>
            <form onSubmit={handleSubmit(submitHandler)}>
            
            <div className="flex flex-column gap-2">
            <label htmlFor="name" className="accent">Class</label>
            <InputText id="name" aria-describedby="name-help" className="my-input" {...register("name")}/>
            <small className="authErrors">
                {errors.name?.message}
            </small>
          </div>

            <div className="flex flex-column gap-2">
            <label htmlFor="section" className="accent">Section</label>
            <InputText id="section" aria-describedby="section-help" className="my-input" {...register("section")}/>
            <small className="authErrors">
                {errors.section?.message}
            </small>
          </div>

            <div className="flex flex-column gap-2">
            <label htmlFor="subject" className="accent">Subject</label>
            <InputText id="subject" aria-describedby="subject-help" className="my-input" {...register("subject")}/>
            <small className="authErrors">
                {errors.subject?.message}
            </small>
          </div>
          <small className="authErrors">
              {reqError}
            </small>
           <div className='flex justify-content-end mt-3'>
           <Button label="Create Class" className='textButt' text />
           </div>
            </form>
        </Dialog>
    </div>
  )
}

export default CreateClass