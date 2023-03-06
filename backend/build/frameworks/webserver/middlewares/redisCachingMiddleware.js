"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisCachingMiddleware = void 0;
function redisCachingMiddleware(redisClient, key) {
    return async function (req, res, next) {
        const params = req.params.id;
        const user = await redisClient.get(`${key}-${params}`);
        if (!user) {
            return next();
        }
        else {
            res.json(JSON.parse(user));
        }
    };
}
exports.redisCachingMiddleware = redisCachingMiddleware;
