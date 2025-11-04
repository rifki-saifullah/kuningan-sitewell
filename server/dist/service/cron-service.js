"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
class CronService {
    static async findCron() {
        const cronJob = await database_1.prismaClient.cronJob.findFirst({
            include: {
                cron_schedule: true,
            }
        });
        if (!cronJob) {
            throw new response_error_1.ResponseError(404, "Cron job not found");
        }
        return cronJob;
    }
    static async getCronSchedules() {
        return await database_1.prismaClient.cronSchedule.findMany({});
    }
    static async updateCronJob(cronScheduleId) {
        const cronJob = await database_1.prismaClient.cronJob.findFirst({});
        if (!cronJob) {
            throw new response_error_1.ResponseError(404, "Cron job not found");
        }
        await database_1.prismaClient.cronJob.update({
            where: { id: cronJob.id },
            data: { cron_schedule_id: cronScheduleId },
        });
    }
}
exports.CronService = CronService;
//# sourceMappingURL=cron-service.js.map