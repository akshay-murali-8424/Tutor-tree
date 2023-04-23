import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ClassWorkDbRepository } from "../../application/repositories/classWorkDbRepository";
import { StudentsDbInterface } from "../../application/repositories/studentsDbRepository";
import { SubmissionDbInterface } from "../../application/repositories/submissionDbRepository";
import { CloudServiceInterface } from "../../application/services/cloudServiceInterface";
import { createWork, getAllClassWorks, getClassWork } from "../../application/useCases/classWork/classWorkCrud";
import { createNewSubmission, getSubmissionById, getSubmissionsByWork, returnWorkSubmissions, setMark } from "../../application/useCases/submissions/submissionCrud";
import { ClassWorkRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/classWorkRepositoryMongoDb";
import { StudentsRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/studentsRepositoryMongoDB";
import { SubmissionsRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/submissionsRepositoryMongoDb";
import { CloudServiceImpl } from "../../frameworks/services/s3Service";
import { ClassWorkInterface } from "../../types/classWorkInterface";
import { getAttachmentUrl } from "../../application/useCases/classWork/getAttachmentUrl";

export const classWorkController = (
  cloudServiceInterface: CloudServiceInterface,
  cloudServiceImpl: CloudServiceImpl,
  classWorkDbRepository: ClassWorkDbRepository,
  classWorkDbRepositoryImpl: ClassWorkRepositoryMongoDb,
  submissionsDbRepository:SubmissionDbInterface,
  submissionsDbRepositoryImpl:SubmissionsRepositoryMongoDb,
  studentsDbRepository:StudentsDbInterface,
  studentsRepositoryImpl:StudentsRepositoryMongoDB
) => {
  const cloudService = cloudServiceInterface(cloudServiceImpl());
  const dbRepositoryClassWork = classWorkDbRepository(
    classWorkDbRepositoryImpl()
  );
  const dbRepositorySubmission = submissionsDbRepository(submissionsDbRepositoryImpl())
  const dbRepositoryStudents = studentsDbRepository(studentsRepositoryImpl())

  const createClassWork = asyncHandler(async (req: Request, res: Response) => {
    const {courseId} = req.params
    const classWork: ClassWorkInterface = req.body;
    const attachments = req.files as Express.Multer.File[];
      const userId = req.userId
    if(userId){
      await createWork(classWork, attachments, cloudService,dbRepositoryClassWork,userId,courseId,dbRepositoryStudents,dbRepositorySubmission);
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


  const getAttachment = asyncHandler(async(req:Request,res:Response)=>{
      const {key} = req.params
      const url = await getAttachmentUrl(key,cloudService)
      res.json({
        status:"success",
        url
      })
  })

  const postSubmission = asyncHandler(async(req:Request,res:Response)=>{
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

  const getSubmissions = asyncHandler(async(req:Request,res:Response)=>{
    const {classWorkId} = req.params
    const submissions = await getSubmissionsByWork(dbRepositorySubmission,classWorkId)
    res.json(submissions)
  })

  const getSubmission = asyncHandler(async(req:Request,res:Response)=>{
    const {classWorkId} = req.params
    const userId = req.userId
    if(userId){
      const submission = await getSubmissionById(dbRepositorySubmission,classWorkId,userId)
      res.json(submission)
    }
  })
  
  const returnSubmissions =asyncHandler(async(req:Request,res:Response)=>{
    const {submissions}:{submissions:string[]} = req.body
    await returnWorkSubmissions(submissions,dbRepositorySubmission)
    res.json({
      status:"success",
      message:"submissions returned"
    })
  }) 

  const setSubmissionMark = asyncHandler(async(req:Request,res:Response)=>{
     const {id} = req.params
     const {mark}:{mark:number} = req.body
     await setMark(id,mark,dbRepositorySubmission)
     res.json({
      status:"success",
      message:"mark set"
     })
  })


  return {
    createClassWork,
    getAll,
    getOne,
    postSubmission,
    getSubmissions,
    returnSubmissions,
    getSubmission,
    setSubmissionMark,
    getAttachment
  };
};
