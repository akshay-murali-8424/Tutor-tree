import asyncHandler from 'express-async-handler'
import { Request, Response } from "express";
import { getAssignedWorks, getSubmittedWorks } from '../../application/useCases/student/getClassWorks';
import { SubmissionDbInterface } from '../../application/repositories/submissionDbRepository';
import { SubmissionsRepositoryMongoDb } from '../../frameworks/database/mongoDb/repositories/submissionsRepositoryMongoDb';
import { UserDbInterface } from '../../application/repositories/userDbRepository';
import { UserRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB';


const studentController = (
   submissionsDbRepository:SubmissionDbInterface,
   submissionsDbRepositoryImpl:SubmissionsRepositoryMongoDb,
   userDbRepository: UserDbInterface,
   userDbRepositoryImpl: UserRepositoryMongoDB,
) =>{

   const dbRepositorySubmission = submissionsDbRepository(submissionsDbRepositoryImpl())
   const dbRepositoryUser = userDbRepository(userDbRepositoryImpl())

   
   const getAllAssignedWorks=asyncHandler(async(req:Request,res:Response)=>{
      const course = req.query.course as string
      const userId = req.userId 
      if(userId){
         const response =await getAssignedWorks(dbRepositorySubmission,course,userId,dbRepositoryUser)
         res.json(response)
      }
   })

   const getAllSubmittedWorks=asyncHandler(async(req:Request,res:Response)=>{
      const course = req.query.course as string
      const userId = req.userId
      if(userId){
        const response = getSubmittedWorks(dbRepositorySubmission,course,userId,dbRepositoryUser)
        res.json(response)
      }
   })

   return{
    getAllAssignedWorks,
    getAllSubmittedWorks
   }
}

export default studentController