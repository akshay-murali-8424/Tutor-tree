import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ClassWorkDbRepository } from "../../application/repositories/classWorkDbRepository";
import { CloudServiceInterface } from "../../application/services/cloudServiceInterface";
import { createWork } from "../../application/useCases/classWork/classWorkCrud";
import { ClassWorkRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/classWorkRepositoryMongoDb";
import { CloudServiceImpl } from "../../frameworks/services/s3Service";
import { ClassWorkInterface } from "../../types/classWorkInterface";

export const classWorkController = (
  cloudServiceInterface: CloudServiceInterface,
  cloudServiceImpl: CloudServiceImpl,
  classWorkDbRepository: ClassWorkDbRepository,
  classWorkDbRepositoryImpl: ClassWorkRepositoryMongoDb
) => {
  const cloudService = cloudServiceInterface(cloudServiceImpl());
  const dbRepositoryClassWork = classWorkDbRepository(
    classWorkDbRepositoryImpl()
  );

  const createClassWork = asyncHandler(async (req: Request, res: Response) => {
    const classWork: ClassWorkInterface = req.body;
    const attachments = req.files as Express.Multer.File[];
    const userId = req.userId
    if(userId){
      await createWork(classWork, attachments, cloudService,dbRepositoryClassWork,userId);
      res.json({
        status: "success",
        message:"new classwork added"
      });
    }
  });

  return {
    createClassWork,
  };
};
