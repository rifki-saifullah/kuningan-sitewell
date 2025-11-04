import { logger } from "./application/logging";
import { startNotificationScheduler } from "./application/notification";
import { initRedis } from "./application/redis";
import { web } from "./application/web";
import { config } from "./config/config";

async function bootstrap() {
    const port = config.app.port;

    await initRedis();
    logger.info("✅[SUCCESS]: Redis connected")

    await startNotificationScheduler();
    logger.info(`✅[SUCCESS]: Notification service scheduled`);

    web.listen(port, () => logger.info(`✅[SUCCESS]: Express listening on port ${port}`));
}

bootstrap().catch((e) => {
    logger.error("❌[FAILED]: Error starting application");
    logger.error("💬[ERROR MESSAGE]: ", e);
    process.exit(1);
});