import cron from "node-cron";
import { logger } from "./logging";
import { NotificationService } from "../service/notification-service";
import { config } from "../config/config";

export async function startNotificationScheduler() {
  cron.schedule(config.cron.schedule, async () => {
    await NotificationService.startNotificationService();
    logger.info(`✅[SUCCESS]: Website down notifications sent successfully`);
  });

  logger.info(
    `✅[SUCCESS]: Notification service scheduled`
  );
}
