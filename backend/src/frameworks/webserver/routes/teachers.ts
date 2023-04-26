import express from "express";
import teacherController from "../../../adapters/controllers/teacherController";
import { classWorkDbRepository } from "../../../application/repositories/classWorkDbRepository";
import { classWorkRepositoryMongoDb } from "../../database/mongoDb/repositories/classWorkRepositoryMongoDb";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepositoryMongoDB";

const teachersRouter = () =>{
    const router = express.Router()

    const controller = teacherController(classWorkDbRepository,classWorkRepositoryMongoDb,userDbRepository,userRepositoryMongoDB)

    router.get('/reviewed',controller.getAllReviewed)

    router.get('/to-review',controller.getAllNotReviewed)

    return router
}

export default teachersRouter