import { createClient } from "redis";
import { logger } from "./logging";
import { config } from "../config/config";

const redisClient = createClient({ url: config.redis.url })

redisClient.on("error", (e) => {
    logger.error("❌[ERROR]: Redis client error");
    logger.error("💬[ERROR MESSAGE]: ", e);
});

export async function initRedis(): Promise<void> {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

export default redisClient;