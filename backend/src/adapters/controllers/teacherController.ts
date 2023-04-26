import asyncHandler from 'express-async-handler'
import { Request, Response } from "express";
import { getNotReviewedWorks, getReviewedWorks } from '../../application/useCases/teacher/getClassWorks';
import { ClassWorkRepositoryMongoDb } from '../../frameworks/database/mongoDb/repositories/classWorkRepositoryMongoDb';
import { ClassWorkDbRepository } from '../../application/repositories/classWorkDbRepository';
import { UserDbInterface } from '../../application/repositories/userDbRepository';
import { UserRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB';

const teacherController = (classWorkDbRepository: ClassWorkDbRepository,
    classWorkDbRepositoryImpl: ClassWorkRepositoryMongoDb,
    userDbRepository: UserDbInterface,
    userDbRepositoryImpl: UserRepositoryMongoDB) => {

    const dbRepositoryClassWork = classWorkDbRepository(classWorkDbRepositoryImpl())
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl())
   
    const getAllReviewed = asyncHandler(async(req:Request,res:Response)=>{
       const course = req.query.course as string
       const userId = req.userId 
       if(userId){
           const classWorks =await getReviewedWorks(dbRepositoryClassWork,course,userId,dbRepositoryUser)
           res.json(classWorks)
       }
    })
   
    const getAllNotReviewed = asyncHandler(async(req:Request,res:Response)=>{
        const course = req.query.course as string
        const userId = req.userId 
        if(userId){
            const classWorks =await getNotReviewedWorks(dbRepositoryClassWork,course,userId,dbRepositoryUser)
            res.json(classWorks)
        }
    })


    return {
        getAllReviewed,
        getAllNotReviewed
    }

}

export default teacherController