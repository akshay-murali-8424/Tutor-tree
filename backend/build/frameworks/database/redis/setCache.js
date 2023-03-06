"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisRepository = void 0;
function redisRepository(redisClient) {
    const setCache = ({ key, expireTimeSec, data, }) => redisClient.setEx(key, expireTimeSec, data);
    return {
        setCache,
    };
}
exports.redisRepository = redisRepository;
