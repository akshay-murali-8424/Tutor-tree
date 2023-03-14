import { Request, Response } from 'express'
import adminLogin from '../../application/useCases/auth/adminAuth'
import asyncHandler from 'express-async-handler'
import { AdminRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/adminRepositoryMongoDB'
import { AuthService } from '../../frameworks/services/authService'
import { AdminDbInterface } from '../../application/repositories/adminDbRepository'
import { AuthServiceInterface } from '../../application/services/authServiceInterface'
import { UserDbInterface } from '../../application/repositories/userDbRepository'
import { UserRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB'
import { signInWithGoogle, userLogin, userRegister } from '../../application/useCases/auth/userAuth'
import { GoogleAuthServiceInterface } from '../../application/services/googleAuthServiceInterface'
import { GoogleAuthService } from '../../frameworks/services/googleAuthService'

const authController = (adminDbRepository: AdminDbInterface,
    adminDbRepositoryImpl: AdminRepositoryMongoDB,
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    userDbRepository: UserDbInterface,
    userDbRepositoryImpl : UserRepositoryMongoDB,
    googleAuthServiceInterface:GoogleAuthServiceInterface,
    googleAuthServiceImpl:GoogleAuthService,
    ) => {

    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl())
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl())
    const authService = authServiceInterface(authServiceImpl())
    const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl())

    const loginAdmin =asyncHandler(async(req: Request, res: Response) => {
        const { email, password }: { email: string, password: string } = req.body
        const token=await adminLogin(email,password,dbRepositoryAdmin,authService)
        res.json({
            status: "success",
            message: "admin verified",
            token,
        })
    })

    const registerUser = asyncHandler(async(req:Request,res:Response)=>{
        const user:{firstName:string,lastName:string,email:string,password:string} = req.body
        const token = await userRegister(user,dbRepositoryUser,authService)
        res.json({
            status:"success",
            message:"new user registered",
            token
        })
    })

    const loginUser = asyncHandler(async(req:Request,res:Response)=>{
        const {email,password}:{email:string,password:string} = req.body;
        const token = await userLogin(email,password,dbRepositoryUser,authService)
        res.json({
            status:"success",
            message:"user verified",
            token
        })
    })

   const loginWithGoogle =asyncHandler(async(req:Request,res:Response)=>{
       const {credential}:{credential:string} = req.body
       const token = await signInWithGoogle(credential,googleAuthService,dbRepositoryUser,authService)
       res.json({
        status:"success",
        message:"user verified",
        token
      })
   })

    return {
        loginAdmin,
        registerUser,
        loginUser,
        loginWithGoogle
    }

}

export default authController
