"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const adminLogin = async (email, password, adminRepository, authService) => {
    const admin = await adminRepository.getAdminByEmail(email);
    if (!admin) {
        throw new appError_1.default("invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, admin.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(admin._id);
    return token;
};
exports.default = adminLogin;
