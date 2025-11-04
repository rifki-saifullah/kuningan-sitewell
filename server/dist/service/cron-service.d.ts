import { CronJobWithScheduleResponse } from "../model/cron-model";
import { CronSchedule } from "../../generated/prisma";
export declare class CronService {
    static findCron(): Promise<CronJobWithScheduleResponse>;
    static getCronSchedules(): Promise<CronSchedule[]>;
    static updateCronJob(cronScheduleId: number): Promise<void>;
}
//# sourceMappingURL=cron-service.d.ts.map