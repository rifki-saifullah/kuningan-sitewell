import { prismaClient } from "../application/database";
import { CronJobWithScheduleResponse, cronScheduleResponse } from "../model/cron-model";
import { ResponseError } from "../error/response-error";
import { CronSchedule } from "../../generated/prisma";

export class CronService {
    static async findCron(): Promise<CronJobWithScheduleResponse> {
        const cronJob = await prismaClient.cronJob.findFirst({
            include: {
                cron_schedule: true,
            }
        });

        if (!cronJob) {
            throw new ResponseError(404, "Cron job not found");
        }

        return cronJob;
    }

    static async getCronSchedules(): Promise<CronSchedule[]> {
       return await prismaClient.cronSchedule.findMany({});
    }

    static async updateCronJob(cronScheduleId: number): Promise<void> {
        const cronJob = await prismaClient.cronJob.findFirst({});

        if (!cronJob) {
            throw new ResponseError(404, "Cron job not found");
        }

        await prismaClient.cronJob.update({
            where: { id: cronJob.id },
            data: { cron_schedule_id: cronScheduleId },
        })
    }
}