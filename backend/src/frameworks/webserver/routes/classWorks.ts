import express from "express";
import { classWorkController } from "../../../adapters/controllers/classWorkController";
import { classWorkDbRepository } from "../../../application/repositories/classWorkDbRepository";
import { studentsDbRepository } from "../../../application/repositories/studentsDbRepository";
import { submissionDbRepository } from "../../../application/repositories/submissionDbRepository";
import { cloudServiceInterface } from "../../../application/services/cloudServiceInterface";
import { classWorkRepositoryMongoDb } from "../../database/mongoDb/repositories/classWorkRepositoryMongoDb";
import { studentsRepositoryMongoDB } from "../../database/mongoDb/repositories/studentsRepositoryMongoDB";
import { submissionsRepositoryMongoDb } from "../../database/mongoDb/repositories/submissionsRepositoryMongoDb";
import { s3Service } from "../../services/s3Service";
import upload from "../middlewares/multer";
import userAuthMiddleware from "../middlewares/userAuthMiddleware";

const classWorks=()=>{
    const router = express.Router();

    const controller = classWorkController(cloudServiceInterface,
        s3Service,
        classWorkDbRepository,
        classWorkRepositoryMongoDb,
        submissionDbRepository,
        submissionsRepositoryMongoDb,
        studentsDbRepository,
        studentsRepositoryMongoDB)

    router.route('/:courseId/classWorks')
    .post(userAuthMiddleware,upload.array("attachments"),controller.createClassWork)
    .get(userAuthMiddleware,controller.getAll)

    router.route('/:courseId/classWorks/:id')
    .get(userAuthMiddleware,controller.getOne)

    router.get('/stream-attachment/:key',controller.streamAttachedFiles)   
 
    router.post('/:courseId/classWorks/:classWorkId/submissions',userAuthMiddleware,upload.array("attachments"),
    controller.postSubmission)

    router.get('/:courseId/classWorks/:classWorkId/submissions',controller.getSubmissions)

    router.get('/:courseId/classWorks/:classWorkId/submissions/:id',controller.getSubmission)

    return router
}

export default classWorks