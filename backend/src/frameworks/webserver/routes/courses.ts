import express from "express";
import courseController from "../../../adapters/controllers/courseControllers";
import { RedisClient } from "../../../app";
import { cacheRepositoryInterface } from "../../../application/repositories/cacheRepositoryInterface";
import { courseDbRepository } from "../../../application/repositories/courseDbRepository";
import { teachersDbRepository } from "../../../application/repositories/teachersDbRepository";
import { referralCodeInterface } from "../../../application/services/referralCodeInterface";
import { courseRepositoryMongoDB } from "../../database/mongoDb/repositories/courseRepositoryMongoDB";
import { teachersRepositoryMongoDb } from "../../database/mongoDb/repositories/teachersRepositoryMongoDB";
import { redisRepository } from "../../database/redis/setCache";
import { referralCodeService } from "../../services/referralCodeService";
import { redisCachingMiddleware } from "../middlewares/redisCachingMiddleware";

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
        redisClient)

    router.route('/')
    .post(controller.addNewCourse)
    .get()

    router.route('/:id')
    .get(redisCachingMiddleware(redisClient,"course"),controller.getCourse)
    .patch(controller.modifyCourse)

    return router
}

export default coursesRouter