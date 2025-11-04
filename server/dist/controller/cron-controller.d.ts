import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
export declare class CronController {
    static findCron(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static getCronSchedules(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static updateCronJob(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=cron-controller.d.ts.map