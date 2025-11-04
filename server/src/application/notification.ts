import cron from "node-cron";
import { logger } from "./logging";
import { NotificationService } from "../service/notification-service";
import { config } from "../config/config";

export async function startNotificationScheduler() {
  try {
    cron.schedule(config.cron.schedule, async () => {
      await NotificationService.startNotificationService();
      logger.info(`✅[SUCCESS]: Website down notifications sent successfully`);
    });

  } catch (e) {
    logger.error("❌[FAILED]: Notification service cannot scheduled");
    logger.error("💬[ERROR MESSAGE]: ", e);
  }
}
