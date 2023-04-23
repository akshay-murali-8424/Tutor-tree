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
    .post(upload.array("attachments"),controller.createClassWork)
    .get(controller.getAll)

    router.route('/:courseId/classWorks/:id')
    .get(controller.getOne) 
 
    router.post('/:courseId/classWorks/:classWorkId/submissions',upload.array("attachments"),
    controller.postSubmission)

    router.route('/:courseId/classWorks/:classWorkId/submissions')
    .get(controller.getSubmissions)
    .patch(controller.returnSubmissions)

    router.route('/:courseId/classWorks/:classWorkId/submissions/:id')
    .patch(controller.setSubmissionMark)

    router.get('/:courseId/classWorks/:classWorkId/getSubmission',controller.getSubmission)

    router.post('/get-attachment/:key',controller.getAttachment)

    return router
}

export default classWorks