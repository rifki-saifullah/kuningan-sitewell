"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronController = void 0;
const cron_service_1 = require("../service/cron-service");
class CronController {
    static async findCron(req, res, next) {
        try {
            const response = await cron_service_1.CronService.findCron();
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async getCronSchedules(req, res, next) {
        try {
            const response = await cron_service_1.CronService.getCronSchedules();
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async updateCronJob(req, res, next) {
        try {
            await cron_service_1.CronService.updateCronJob(req.body);
            res.status(200).json({
                data: "OK",
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.CronController = CronController;
//# sourceMappingURL=cron-controller.js.map