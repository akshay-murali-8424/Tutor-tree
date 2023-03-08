import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction, useRef } from 'react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { IJoinCoursePayload } from '../../../Types/PayloadInterface';
import { IBasicResponse } from '../../../Types/ResponseInterface';
import { useJoinClassMutation } from '../../../redux/Features/api/apiSlice';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const schema = yup.object().shape({
  refCode: yup.string().required(),
});

function JoinClass({joinVisible, setJoinVisible}:{joinVisible:boolean,setJoinVisible:Dispatch<SetStateAction<boolean>>}) {
  const toast = useRef<Toast>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState:{ errors },
  } = useForm<IJoinCoursePayload>({
    resolver: yupResolver(schema),
  });

  const [joinClass] = useJoinClassMutation()

  const submitHandler=async(data:IJoinCoursePayload)=>{
    try{
      const res:IBasicResponse=await joinClass(data).unwrap()
      if(res.status==='success')
      setJoinVisible(false)
    }catch(err:any){
      console.log(err)
       toast.current?.show({ severity:'error', detail: `${err.data.message}` })
    }
  }

  return (
     <div className="card flex justify-content-center">
     <Dialog header="Join Class" visible={joinVisible} className="accent" style={{ width: '30vw' }} onHide={() => {reset(); setJoinVisible(false)}}>
      <form onSubmit={handleSubmit(submitHandler)}>
     <div className="flex flex-column gap-2">
            <label htmlFor="refCode" className="accent">Referral Code</label>
            <InputText id="refCode" aria-describedby="refCode-help" className="my-input" {...register("refCode")}/>
            <small className="authErrors">
              {errors.refCode?.message}
            </small>
            <Toast ref={toast}/>
          </div>
          <div className='flex justify-content-end mt-3'>
          <Button label="Join Class" className='textButt' text />
          </div>
        </form>
     </Dialog>
 </div>
  )
}

export default JoinClass