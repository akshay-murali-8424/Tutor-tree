import express from "express";
import userController from "../../../adapters/controllers/userControllers";
import { RedisClient } from "../../../app";
import { cacheRepositoryInterface } from "../../../application/repositories/cacheRepositoryInterface";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepositoryMongoDB";
import { redisRepository } from "../../database/redis/setCache";
import { redisCachingMiddleware } from "../middlewares/redisCachingMiddleware";

const userRouter=(redisClient:RedisClient)=>{
    const router = express.Router();

    const controller = userController(userDbRepository,userRepositoryMongoDB,cacheRepositoryInterface,redisRepository,redisClient)
    
    router.get('/',redisCachingMiddleware(redisClient,'user'),controller.getUser)

    return router
}

export default userRouter