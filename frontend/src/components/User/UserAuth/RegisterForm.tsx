import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IRegisterPayload } from "../../../Types/PayloadInterface";
import {  useUserRegisterMutation } from "../../../redux/Features/api/apiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ILoginResponse } from "../../../Types/ResponseInterface";
import { setToken } from "../../../redux/Features/reducers/userAuthSlice";


        

const schema = yup.object().shape({
  firstName: yup.string().required().matches(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]*$/,"enter a valid name"),
  lastName:yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup
  .string().required()
  .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPayload>({
    resolver: yupResolver(schema),
  });
  
  const [registerError,setRegisterError] = useState('')
  const [registerUser,{isLoading}]=useUserRegisterMutation(); 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler =async (data:IRegisterPayload) => {
    if(!isLoading){
      try{
        const res:ILoginResponse=await registerUser(data).unwrap()
        if(res.status ==='success'){
          dispatch(setToken(res));
          navigate('/home')
        }
      }catch(err:any){
        setRegisterError(err.data.message)
      }
    }
  };

  return (
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4 mx-auto my-8">
      <div className="text-center mb-5">
        <img
          src="https://res.cloudinary.com/dzgqefrmc/image/upload/v1678038349/Tutor_Tree-1_2_f7jlp2.png"
          alt="hyper"
          height={140}
        />
        <div className=" text-3xl font-medium mb-3 accent">Register</div>
        <span className="text-600 font-medium line-height-3">
          Already have an account?
        </span>
        <Link to={"/login"}
          className="font-medium no-underline ml-2 cursor-pointer primary"
        >
          Sign in
        </Link>
      </div>

     
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex gap-1 justify-content-between">

          <div className="flex w-6 flex-column gap-2">
            <label htmlFor="firstName" className="accent">First name</label>
            <InputText id="firstName" aria-describedby="firstName-help" className="my-input" {...register("firstName")}/>
            <small className="authErrors">
              {errors.firstName?.message}
            </small>
          </div>

          <div className="flex w-6 flex-column gap-2">
            <label htmlFor="lastName" className="accent">Last name</label>
            <InputText id="lastName" aria-describedby="lastName-help" className="my-input" {...register("lastName")}/>
            <small className="authErrors">
              {errors.lastName?.message}
            </small>
          </div>

          </div>
          <div className="flex flex-column gap-2">
            <label htmlFor="email" className="accent">Email</label>
            <InputText id="email" aria-describedby="email-help" className="my-input" {...register("email")}/>
            <small className="authErrors">
              {errors.email?.message}
            </small>
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="password" className="accent">Password</label>
            <InputText id="password" type="password" aria-describedby="password-help" className="my-input" {...register("password")} />
            <small className="authErrors">
              {errors.password?.message}
            </small>
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="confirmPassword" className="accent">Confirm password</label>
            <InputText id="confirmPassword" type="password" aria-describedby="confirmPassword-help" className="my-input" {...register("confirmPassword")}/>
            <small className="authErrors">
            {errors.confirmPassword?.message}
            </small>
          </div>

          <small className="authErrors">
              {registerError}
            </small>
          <Button label="Sign Up" className="w-full primaryButt mt-2" />
        </form>
      
    </div>
  );
}
