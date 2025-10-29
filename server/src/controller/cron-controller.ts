import { NextFunction, Request, Response } from "express";
import { CronService } from "../service/cron-service";
import { CronJobWithScheduleResponse } from "../model/cron-model";
import { CronSchedule } from "../../generated/prisma";
import { UserRequest } from "../type/user-request";

export class CronController {
    static async findCron(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: CronJobWithScheduleResponse = await CronService.findCron();
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getCronSchedules(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: CronSchedule[] = await CronService.getCronSchedules();
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async updateCronJob(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await CronService.updateCronJob(req.body);
            res.status(200).json({
                data: "OK",
            });
        } catch (e) {
            next(e);
        }
    }
}