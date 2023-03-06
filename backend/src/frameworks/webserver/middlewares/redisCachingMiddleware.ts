import { NextFunction, Request, Response } from "express";
import { RedisClient } from "../../../app";

export function redisCachingMiddleware(redisClient:RedisClient, key:string) {
    return async function (req:Request, res:Response, next:NextFunction) {
      const params = req.params.id;
      const user =await redisClient.get(`${key}-${params}`)
      if(!user){
        return next()
      }else{
        res.json(JSON.parse(user))
      }
    };
}



