"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("../../../adapters/controllers/authControllers"));
const adminDbRepository_1 = require("../../../application/repositories/adminDbRepository");
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const adminRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/adminRepositoryMongoDB");
const userRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/userRepositoryMongoDB");
const authService_1 = require("../../services/authService");
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authControllers_1.default)(adminDbRepository_1.adminDbRepository, adminRepositoryMongoDB_1.adminRepositoryMongoDB, authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB);
    router.post('/admin-login', controller.loginAdmin);
    router.post('/register', controller.registerUser);
    router.post('/user-login', controller.LoginUser);
    return router;
};
exports.default = authRouter;
