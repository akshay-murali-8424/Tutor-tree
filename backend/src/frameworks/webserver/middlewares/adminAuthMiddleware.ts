import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { authService } from "../../services/authService";

const adminAuthMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    let token:string | null='';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
       throw new AppError("Token not found",HttpStatus.UNAUTHORIZED)
    }
    try{
    authService().verifyToken(token)
    next()
    }catch(err){
        throw new AppError("UnAuthorized User",HttpStatus.UNAUTHORIZED)
    }
}

export default adminAuthMiddleware