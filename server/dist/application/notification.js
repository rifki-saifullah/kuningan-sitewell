"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNotificationScheduler = startNotificationScheduler;
const node_cron_1 = __importDefault(require("node-cron"));
const logging_1 = require("./logging");
const notification_service_1 = require("../service/notification-service");
const config_1 = require("../config/config");
async function startNotificationScheduler() {
    try {
        node_cron_1.default.schedule(config_1.config.cron.schedule, async () => {
            await notification_service_1.NotificationService.startNotificationService();
            logging_1.logger.info(`✅[SUCCESS]: Website down notifications sent successfully`);
        });
    }
    catch (e) {
        logging_1.logger.error("❌[FAILED]: Notification service cannot scheduled");
        logging_1.logger.error("💬[ERROR MESSAGE]: ", e);
    }
}
//# sourceMappingURL=notification.js.map