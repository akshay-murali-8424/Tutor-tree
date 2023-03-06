"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findById_1 = require("../../application/useCases/user/findById");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userController = (userDbRepository, userDbRepositoryImpl, cacheRepositoryInterface, cacheRepositoryImpl, cacheClient) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const cacheRepository = cacheRepositoryInterface(cacheRepositoryImpl(cacheClient));
    const getUser = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.params.id;
        const user = await (0, findById_1.findById)(userId, dbRepositoryUser);
        const cacheOptions = {
            key: `user-${user._id}`,
            expireTimeSec: 600,
            data: JSON.stringify(user)
        };
        cacheRepository.setCache(cacheOptions);
        res.json(user);
    });
    return {
        getUser,
    };
};
exports.default = userController;
