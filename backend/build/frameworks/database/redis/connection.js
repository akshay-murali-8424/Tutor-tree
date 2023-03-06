"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const connection = () => {
    const createRedisClient = function createRedisClient() {
        const client = (0, redis_1.createClient)();
        client.on('error', err => console.log('Redis Client Error', err));
        client.connect().then(() => {
            console.log("Redis connected successfully".bg_red);
        }).catch((err) => {
            console.log(err);
        });
        return client;
    };
    return {
        createRedisClient
    };
};
exports.default = connection;
