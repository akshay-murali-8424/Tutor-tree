"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userRepositoryMongoDB = () => {
    const getUserByEmail = async (email) => await userModel_1.default.findOne({ email });
    const addUser = async (user) => await userModel_1.default.create(user);
    const getUserById = async (id) => await userModel_1.default.findById(id);
    return {
        getUserByEmail,
        addUser,
        getUserById
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
