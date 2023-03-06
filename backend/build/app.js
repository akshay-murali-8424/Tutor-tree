"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./frameworks/database/mongoDb/connection"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const connection_2 = __importDefault(require("./frameworks/database/redis/connection"));
const Colors = require("colors.ts");
const errorHandlingMiddleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandlingMiddleware"));
const appError_1 = __importDefault(require("./utils/appError"));
Colors.enable;
dotenv_1.default.config({ path: "config.env" });
const app = (0, express_1.default)();
//connecting mongoDb
(0, connection_1.default)();
const redisClient = (0, connection_2.default)().createRedisClient();
(0, express_2.default)(app);
// routes for each endpoint
(0, routes_1.default)(app, redisClient);
app.use(errorHandlingMiddleware_1.default);
// catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found', 404));
});
(0, server_1.default)(app).startServer();
