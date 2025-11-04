import axios from "axios";
import { config } from "../config/config";
import { logger } from "../application/logging";
import { WebsiteService } from "./website-service";
import { notificationTemplate } from "../util/util";

export class NotificationService {
    static async sendTelegramNotification(message: string): Promise<void> {
        try {
            const url = `https://api.telegram.org/bot${config.telegram.botToken}/sendMessage`;
            await axios.post(url, {
                chat_id: config.telegram.chatId,
                text: message,
                parse_mode: 'HTML',
            });

        } catch (e) {
            logger.error("❌[FAILED]: Send telegram notification");
            logger.error("💬[ERROR MESSAGE]: ", e);

        }
    }

    static async startNotificationService(): Promise<void> {
        await WebsiteService.updateDetailAll();

        const downWebsites = await WebsiteService.getDownWebsite();
        if (downWebsites.length === 0) return;

        const message = notificationTemplate(downWebsites);

        await this.sendTelegramNotification(message);
    }
}