import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ClassWorkDbRepository } from "../../application/repositories/classWorkDbRepository";
import { SubmissionDbInterface } from "../../application/repositories/submissionDbRepository";
import { CloudServiceInterface } from "../../application/services/cloudServiceInterface";
import { createWork, getAllClassWorks, getClassWork } from "../../application/useCases/classWork/classWorkCrud";
import { streamFiles } from "../../application/useCases/classWork/streamFiles";
import { createNewSubmission } from "../../application/useCases/submissions/submissionCrud";
import { ClassWorkRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/classWorkRepositoryMongoDb";
import { SubmissionsRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/submissionsRepositoryMongoDb";
import { CloudServiceImpl } from "../../frameworks/services/s3Service";
import { ClassWorkInterface } from "../../types/classWorkInterface";

export const classWorkController = (
  cloudServiceInterface: CloudServiceInterface,
  cloudServiceImpl: CloudServiceImpl,
  classWorkDbRepository: ClassWorkDbRepository,
  classWorkDbRepositoryImpl: ClassWorkRepositoryMongoDb,
  submissionsDbRepository:SubmissionDbInterface,
  submissionsDbRepositoryImpl:SubmissionsRepositoryMongoDb
) => {
  const cloudService = cloudServiceInterface(cloudServiceImpl());
  const dbRepositoryClassWork = classWorkDbRepository(
    classWorkDbRepositoryImpl()
  );
  const dbRepositorySubmission = submissionsDbRepository(submissionsDbRepositoryImpl())

  const createClassWork = asyncHandler(async (req: Request, res: Response) => {
    const {courseId} = req.params
    const classWork: ClassWorkInterface = req.body;
    const attachments = req.files as Express.Multer.File[];
    const userId = req.userId
    if(userId){
      await createWork(classWork, attachments, cloudService,dbRepositoryClassWork,userId,courseId);
      res.json({
        status: "success",
        message:"new classwork added"
      });
    }
  });

  const getAll =asyncHandler(async(req:Request,res:Response)=>{
    const {courseId} = req.params
    const classWorks = await getAllClassWorks(courseId,dbRepositoryClassWork)
    res.json(classWorks)
  })

  const getOne = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params
    const classWork = await getClassWork(id,dbRepositoryClassWork)
    res.json(classWork)
  })

  const streamAttachedFiles = asyncHandler(async(req:Request,res:Response)=>{
    const {key} = req.params
    const readStream = streamFiles(key,cloudService)
    readStream.pipe(res)
  })

  const newSubmission = asyncHandler(async(req:Request,res:Response)=>{
   const {classWorkId} = req.params
   const attachments = req.files as Express.Multer.File[];
   const userId = req.userId
   if(userId){
     await createNewSubmission(userId,classWorkId,attachments,cloudService,dbRepositorySubmission)
     res.json({
      status:"success",
      message: "work submitted"
     })
   }
  })

  return {
    createClassWork,
    getAll,
    getOne,
    streamAttachedFiles,
    newSubmission
  };
};
