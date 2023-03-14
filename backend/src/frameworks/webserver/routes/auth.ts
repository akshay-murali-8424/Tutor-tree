import express from "express";
import authController from "../../../adapters/controllers/authControllers";
import { adminDbRepository } from "../../../application/repositories/adminDbRepository";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import {authServiceInterface} from "../../../application/services/authServiceInterface";
import { googleAuthServiceInterface } from "../../../application/services/googleAuthServiceInterface";
import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepositoryMongoDB";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepositoryMongoDB";
import { authService } from "../../services/authService";
import { googleAuthService } from "../../services/googleAuthService";


const authRouter=()=>{
    const router = express.Router();
    
    const controller = authController(
    adminDbRepository ,
    adminRepositoryMongoDB,
    authServiceInterface ,
    authService,
    userDbRepository,
    userRepositoryMongoDB,
    googleAuthServiceInterface,
    googleAuthService
    );

    router.post('/admin-login',controller.loginAdmin)

    router.post('/register',controller.registerUser)

    router.post('/user-login',controller.loginUser)

    router.post('/sign-in-with-google',controller.loginWithGoogle)

    return router
}

export default authRouter