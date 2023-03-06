"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminAuth_1 = __importDefault(require("../../application/useCases/auth/adminAuth"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/useCases/auth/userAuth");
const authController = (adminDbRepository, adminDbRepositoryImpl, authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const loginAdmin = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const token = await (0, adminAuth_1.default)(email, password, dbRepositoryAdmin, authService);
        res.json({
            status: "success",
            message: "admin verified",
            token,
        });
    });
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const token = await (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "new user registered",
            token
        });
    });
    const LoginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const token = await (0, userAuth_1.userLogin)(email, password, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "user verified",
            token
        });
    });
    return {
        loginAdmin,
        registerUser,
        LoginUser
    };
};
exports.default = authController;
