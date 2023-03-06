"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const findById = async (userId, dbRepositoryUser) => {
    const user = await dbRepositoryUser.getUserById(userId);
    if (!user) {
        throw new appError_1.default("user not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return user;
};
exports.findById = findById;
