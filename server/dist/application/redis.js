"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRedis = initRedis;
const redis_1 = require("redis");
const logging_1 = require("./logging");
const config_1 = require("../config/config");
const redisClient = (0, redis_1.createClient)({ url: config_1.config.redis.url });
redisClient.on("error", (e) => {
    logging_1.logger.error("❌[ERROR]: Redis client error");
    logging_1.logger.error("💬[ERROR MESSAGE]: ", e);
});
async function initRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}
exports.default = redisClient;
//# sourceMappingURL=redis.js.map