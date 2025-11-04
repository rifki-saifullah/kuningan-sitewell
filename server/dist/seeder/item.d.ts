import { CreateCronJobRequest, CreateCronScheduleRequest } from "../model/cron-model";
import { CreateWebsiteRequest } from "../model/website-model";
export declare const cronSchedules: {
    everyHalfHour: string;
    everyHour: string;
    every3Hours: string;
    every6Hours: string;
    every12Hours: string;
    daily: string;
};
export declare function cronJobSeed(cronScheduleId: number): CreateCronJobRequest;
export declare const cronScheduleSeeds: CreateCronScheduleRequest[];
export declare const websiteSeeds: CreateWebsiteRequest[];
//# sourceMappingURL=item.d.ts.map