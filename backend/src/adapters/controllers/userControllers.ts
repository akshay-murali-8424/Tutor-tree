import { Request, Response } from "express";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { findById } from "../../application/useCases/user/findById";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import asyncHandler from "express-async-handler";
import { CacheRepositoryInterface } from "../../application/repositories/cacheRepositoryInterface";
import { RedisRepository } from "../../frameworks/database/redis/setCache";
import { RedisClient } from "../../app";

const userController = (
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  cacheRepositoryInterface: CacheRepositoryInterface,
  cacheRepositoryImpl : RedisRepository,
  cacheClient:RedisClient
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const cacheRepository = cacheRepositoryInterface(cacheRepositoryImpl(cacheClient))

  const getUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await findById(userId, dbRepositoryUser);
    const cacheOptions={
        key:`user-${user._id}`,
        expireTimeSec:600,
        data: JSON.stringify(user)
    }
    cacheRepository.setCache(cacheOptions)
    res.json(user);
  });

  return {
    getUser,
  };
};

export default userController;
