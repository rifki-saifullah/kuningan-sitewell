"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("./application/logging");
const notification_1 = require("./application/notification");
const redis_1 = require("./application/redis");
const web_1 = require("./application/web");
const config_1 = require("./config/config");
async function bootstrap() {
    const port = config_1.config.app.port;
    await (0, redis_1.initRedis)();
    logging_1.logger.info("✅[SUCCESS]: Redis connected");
    await (0, notification_1.startNotificationScheduler)();
    logging_1.logger.info(`✅[SUCCESS]: Notification service scheduled`);
    web_1.web.listen(port, () => logging_1.logger.info(`✅[SUCCESS]: Express listening on port ${port}`));
}
bootstrap().catch((e) => {
    logging_1.logger.error("❌[FAILED]: Error starting application");
    logging_1.logger.error("💬[ERROR MESSAGE]: ", e);
    process.exit(1);
});
//# sourceMappingURL=main.js.map