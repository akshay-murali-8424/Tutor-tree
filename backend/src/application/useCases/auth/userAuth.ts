import { HttpStatus } from "../../../types/httpStatus";
import {UserInterface} from "../../../types/userInterface";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { GoogleAuthServiceInterface } from "../../services/googleAuthServiceInterface";

export const userRegister = async (
  user: {firstName:string,lastName:string,email:string,password:string},
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  user.email = user.email.toLowerCase();
  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    throw new AppError("existing email", HttpStatus.UNAUTHORIZED);
  }
  user.password = await authService.encryptPassword(user.password);
  const { _id: userId } = await userRepository.addUser(user);
  const token = authService.generateToken(userId.toString());
  return token;
};

export const userLogin = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
   const user:UserInterface | null = await userRepository.getUserByEmail(email)
   if(!user){
    throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED)
   }
   if(user.isGoogleUser){
    throw new AppError("You are logged in using Google Auth",401)
   }
   const isPasswordCorrect = await authService.comparePassword(password,user.password)
   if(!isPasswordCorrect){
    throw new AppError("Sorry, your password was incorrect. Please double-check your password", HttpStatus.UNAUTHORIZED)
   }
   const token = authService.generateToken(user._id.toString())
   return token
};

export const signInWithGoogle=async(
  credential:string,
  googleAuthService:ReturnType<GoogleAuthServiceInterface>,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>)=>{

  const user = await googleAuthService.verify(credential)
  const isUserExist = await userRepository.getUserByEmail(user.email);
  if(isUserExist){
    const token = authService.generateToken(isUserExist._id.toString());
    return token
  }else{
    const { _id: userId } = await userRepository.addUser(user);
    const token = authService.generateToken(userId.toString());
    return token
  }
}