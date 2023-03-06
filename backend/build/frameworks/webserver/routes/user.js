"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = __importDefault(require("../../../adapters/controllers/userControllers"));
const cacheRepositoryInterface_1 = require("../../../application/repositories/cacheRepositoryInterface");
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/userRepositoryMongoDB");
const setCache_1 = require("../../database/redis/setCache");
const redisCachingMiddleware_1 = require("../middlewares/redisCachingMiddleware");
const userRouter = (redisClient) => {
    const router = express_1.default.Router();
    const controller = (0, userControllers_1.default)(userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB, cacheRepositoryInterface_1.cacheRepositoryInterface, setCache_1.redisRepository, redisClient);
    router.get('/get-user/:id', (0, redisCachingMiddleware_1.redisCachingMiddleware)(redisClient, 'user'), controller.getUser);
    return router;
};
exports.default = userRouter;
