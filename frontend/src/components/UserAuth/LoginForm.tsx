import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./LoginForm.css";
import { useForm } from "react-hook-form";
import { ILoginPayload } from "../../Types/PayloadInterface";
import { useUserLoginMutation } from "../../redux/Features/api/apiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ILoginResponse } from "../../Types/ResponseInterface";
import { setToken } from "../../redux/Features/reducers/userAuthSlice";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: yupResolver(schema),
  });

  const [verifyLogin]=useUserLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginError,setLoginError]=useState('')

  const submitHandler =async (data:ILoginPayload) => {
    try{
      const res:ILoginResponse=await verifyLogin(data).unwrap()
      console.log(res)
      if(res.status ==='success'){
        dispatch(setToken(res));
        navigate('/')
      }
    }catch(err:any){
      setLoginError(err.data.message)
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
        <div className=" text-3xl font-medium mb-3 accent">Welcome Back</div>
        <span className="text-600 font-medium line-height-3">
          Don't have an account?
        </span>
        <Link
          className="font-medium no-underline ml-2 cursor-pointer primary"
          to={"/register"}
        >
          Create today!
        </Link>
      </div>

      <div>
        <form onSubmit={handleSubmit(submitHandler)}>

          <div className="flex flex-column gap-2">
            <label htmlFor="email" className="accent">email</label>
            <InputText id="email" aria-describedby="email-help" className="my-input" {...register("email")}/>
            <small className="authErrors">
              {errors.email?.message}
            </small>
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="password" className="accent">password</label>
            <InputText id="password" aria-describedby="password-help" className="my-input" {...register("password")}/>
            <small className="authErrors">
              {errors.password?.message}
            </small>
          </div>

          <div className="flex align-items-center justify-content-end mb-4">
            <a
              className="font-medium no-underline ml-2 text-right cursor-pointer primary"
              href="/"
             >
              Forgot your password?
            </a>
          </div>
          <small className="authErrors">
              {loginError}
            </small>
          <Button label="Sign In" className="w-full primaryButt mt-2" />
        </form>
      </div>
    </div>
  );
}
