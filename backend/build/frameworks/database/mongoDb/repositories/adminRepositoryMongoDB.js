"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepositoryMongoDB = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const adminRepositoryMongoDB = () => {
    const getAdminByEmail = async (email) => await adminModel_1.default.findOne({ email });
    return {
        getAdminByEmail
    };
};
exports.adminRepositoryMongoDB = adminRepositoryMongoDB;
