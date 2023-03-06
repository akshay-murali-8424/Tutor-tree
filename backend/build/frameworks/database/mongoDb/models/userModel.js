"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "please add a first name"]
    },
    lastName: {
        type: String,
        required: [true, "please add a first name"]
    },
    email: {
        type: String,
        required: [true, "please add a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please add a password"]
    },
}, {
    timestamps: true
});
const User = (0, mongoose_1.model)("User", userSchema, "users");
exports.default = User;
