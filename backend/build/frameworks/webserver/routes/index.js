"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const admin_1 = __importDefault(require("./admin"));
const auth_1 = __importDefault(require("./auth"));
const routes = (app, redisClient) => {
    app.use('/api/auth', (0, auth_1.default)());
    app.use('/api/user', (0, user_1.default)(redisClient));
    app.use('/api/admin', (0, admin_1.default)(redisClient));
};
exports.default = routes;
