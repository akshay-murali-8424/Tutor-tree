import express from "express";
import courseController from "../../../adapters/controllers/courseControllers";
import { RedisClient } from "../../../app";
import { cacheRepositoryInterface } from "../../../application/repositories/cacheRepositoryInterface";
import { courseDbRepository } from "../../../application/repositories/courseDbRepository";
import { studentsDbRepository } from "../../../application/repositories/studentsDbRepository";
import { teachersDbRepository } from "../../../application/repositories/teachersDbRepository";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { referralCodeInterface } from "../../../application/services/referralCodeInterface";
import { courseRepositoryMongoDB } from "../../database/mongoDb/repositories/courseRepositoryMongoDB";
import { studentsRepositoryMongoDB } from "../../database/mongoDb/repositories/studentsRepositoryMongoDB";
import { teachersRepositoryMongoDb } from "../../database/mongoDb/repositories/teachersRepositoryMongoDB";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepositoryMongoDB";
import { redisRepository } from "../../database/redis/setCache";
import { referralCodeService } from "../../services/referralCodeService";
import { redisCachingMiddleware } from "../middlewares/redisCachingMiddleware";
import userAuthMiddleware from "../middlewares/userAuthMiddleware";
import { groupMessageDbRepository } from "../../../application/repositories/groupMessageDbRepository";
import { groupMessageRepositoryMongoDb } from "../../database/mongoDb/repositories/groupMessageRepositoryMongoDb";

const coursesRouter=(redisClient:RedisClient)=>{
    const router = express.Router();
    const controller = courseController(courseDbRepository,
        courseRepositoryMongoDB,
        cacheRepositoryInterface,
        redisRepository,
        referralCodeInterface,
        referralCodeService,
        teachersDbRepository,
        teachersRepositoryMongoDb,
        userDbRepository,
        userRepositoryMongoDB,
        studentsDbRepository,
        studentsRepositoryMongoDB,
        groupMessageDbRepository,
        groupMessageRepositoryMongoDb,
        redisClient)

    router.route('/')
    .post(userAuthMiddleware,controller.addNewCourse)

    router.route('/:id')
    .get(userAuthMiddleware,redisCachingMiddleware(redisClient,"course"),controller.getCourse)
    .patch(controller.modifyCourse)
    
    router.post('/join/:refCode',userAuthMiddleware,controller.joinCourse)

    router.get('/:id/people',userAuthMiddleware,controller.getPeople)

    router.route('/:courseId/teachers')
    .post(userAuthMiddleware,controller.addTeacher)

    router.route('/:courseId/students')
    .post(userAuthMiddleware,controller.addStudent)

    router.route('/:courseId/messages')
    .get(userAuthMiddleware,controller.getGroupMessages)
    
    return router
}

export default coursesRouter