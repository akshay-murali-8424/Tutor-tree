import express from "express";
import { classWorkController } from "../../../adapters/controllers/classWorkController";
import { classWorkDbRepository } from "../../../application/repositories/classWorkDbRepository";
import { cloudServiceInterface } from "../../../application/services/cloudServiceInterface";
import { classWorkRepositoryMongoDb } from "../../database/mongoDb/repositories/classWorkRepositoryMongoDb";
import { s3Service } from "../../services/s3Service";
import upload from "../middlewares/multer";

const classWorks=()=>{
    const router = express.Router();

    const controller = classWorkController(cloudServiceInterface,s3Service,classWorkDbRepository,classWorkRepositoryMongoDb)

    router.post('/',upload.array("attachments"),controller.createClassWork)

    return router
}

export default classWorks