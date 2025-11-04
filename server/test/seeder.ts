import bcrypt from "bcrypt";
import { CronSchedule, User } from "../generated/prisma";
import { prismaClient } from "../src/application/database";
import { logger } from "../src/application/logging";
import { DEFAULTS } from "./test-utils";
import { cronJobSeed, cronScheduleSeeds } from "../src/seeder/item";

class Seeder {
    static async createAdmin(
        username: string = DEFAULTS.USER.USERNAME,
        email: string = DEFAULTS.USER.EMAIL,
        password: string = DEFAULTS.USER.PASSWORD,
    ): Promise<User> {
        return await prismaClient.user.create({
            data: {
                username: username,
                email: email,
                password: await bcrypt.hash(password, 10),
            }
        });
    }
    
    static async createWebsite(count: number = 10) {
        for (let i = 0; i < count; i++) {
            await prismaClient.website.create({
                data: {
                    name: DEFAULTS.WEBSITE.NAME + ` ${i}`,
                    description: DEFAULTS.WEBSITE.DESCRIPTION + ` ${i}`,
                    url: DEFAULTS.WEBSITE.URL,
                    is_healthy: DEFAULTS.WEBSITE.IS_HEALTHY,
                    response_time: DEFAULTS.WEBSITE.RESPONSE_TIME + i,
                    status_code: DEFAULTS.WEBSITE.STATUS_CODE,
                    message: DEFAULTS.WEBSITE.MESSAGE,
                }
            });
        }
    }

    static async createCron() {
        let cronSchedules: CronSchedule[] = [];

        for (const cronScheduleSeed of cronScheduleSeeds) {
            const cronSchedule = await prismaClient.cronSchedule.create({ data: cronScheduleSeed });
            cronSchedules.push(cronSchedule);
        }

        return await prismaClient.cronJob.create({ data: cronJobSeed(cronSchedules[1]!.id) });
    }
}

(async function main() {
    try {
        await Seeder.createAdmin();
        logger.info("✅[SUCCESS]: Admin Seeder created successfully")

        await Seeder.createWebsite(50);
        logger.info("✅[SUCCESS]: Website Seeder created successfully")

        await Seeder.createCron();
        logger.info("✅[SUCCESS]: Cron Seeder created successfully")

    } catch (e) {
        logger.error("❌[FAILED]: Create Production Seeder");
        logger.error("💬[ERROR MESSAGE]: ", e);
        process.exitCode = 1;
    }
})();