import AdminInterface from "../../../types/adminInterface"
import { HttpStatus } from "../../../types/httpStatus"
import AppError from "../../../utils/appError"
import { AdminDbInterface } from "../../repositories/adminDbRepository"
import { AuthServiceInterface } from "../../services/authServiceInterface"

const adminLogin=async(
  email:string,
  password:string,
  adminRepository:ReturnType<AdminDbInterface>,
  authService:ReturnType<AuthServiceInterface>)=>{
    
   const admin:AdminInterface | null= await adminRepository.getAdminByEmail(email)
   if(!admin){
     throw new  AppError("invalid credentials", HttpStatus.UNAUTHORIZED)
   }
   const isPasswordCorrect = await authService.comparePassword(password,admin.password)
   if(!isPasswordCorrect){
    throw new AppError("invalid credentials",HttpStatus.UNAUTHORIZED)
   }
   const token = authService.generateToken(admin._id)
   return token
   
}

export default adminLogin

