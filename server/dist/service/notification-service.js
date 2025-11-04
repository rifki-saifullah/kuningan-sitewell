"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
const logging_1 = require("../application/logging");
const website_service_1 = require("./website-service");
const util_1 = require("../util/util");
class NotificationService {
    static async sendTelegramNotification(message) {
        try {
            const url = `https://api.telegram.org/bot${config_1.config.telegram.botToken}/sendMessage`;
            await axios_1.default.post(url, {
                chat_id: config_1.config.telegram.chatId,
                text: message,
                parse_mode: 'HTML',
            });
        }
        catch (e) {
            logging_1.logger.error("❌[FAILED]: Send telegram notification");
            logging_1.logger.error("💬[ERROR MESSAGE]: ", e);
        }
    }
    static async startNotificationService() {
        await website_service_1.WebsiteService.updateDetailAll();
        const downWebsites = await website_service_1.WebsiteService.getDownWebsite();
        if (downWebsites.length === 0)
            return;
        const message = (0, util_1.notificationTemplate)(downWebsites);
        await this.sendTelegramNotification(message);
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification-service.js.map