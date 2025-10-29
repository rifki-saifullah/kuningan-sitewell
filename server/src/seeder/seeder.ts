import bcrypt from "bcrypt";
import type { CronSchedule, User } from "../../generated/prisma";
import { prismaClient } from "../application/database";
import { config } from "../config/config";
import { logger } from "../application/logging";
import { WebsiteService } from "../service/website-service";
import type { CreateWebsiteRequest } from "../model/website-model";
import { cronJobSeed, cronScheduleSeeds, websiteSeeds } from "./item";

class Seeder {
    static async createAdmin(): Promise<User | null> {
        try {
            await prismaClient.user.deleteMany({});

            const admin = await prismaClient.user.create({
                data: {
                    username: config.admin.username,
                    email: config.admin.email,
                    password: await bcrypt.hash(config.admin.password, 10),
                },
            });

            return admin;
        } catch (err) {
            logger.error("⚠️[WARNING]: Failed to create admin, skipping...", err);
            return null;
        }
    }

    static async createWebsites() {
        await prismaClient.website.deleteMany({});

        const websites: CreateWebsiteRequest[] = websiteSeeds;

        for (const website of websites) {
            try {

                await WebsiteService.create(website);
            } catch (err) {
                logger.error(`⚠️[WARNING]: Failed to create website "${website.name}", skipping...`, err);
            }
        }
    }

    static async createCron() {
        await prismaClient.cronSchedule.deleteMany({});

        let cronSchedules: CronSchedule[] = [];

        for (const cronScheduleSeed of cronScheduleSeeds) {
            try {

                const cronSchedule = await prismaClient.cronSchedule.create({ data: cronScheduleSeed });
                cronSchedules.push(cronSchedule);
            } catch (err) {
                logger.error(`⚠️[WARNING]: Failed to create cron schedule "${cronScheduleSeed.description}", skipping...`, err);
            }
        }

        try {
            await prismaClient.cronJob.deleteMany({});

            await prismaClient.cronJob.create({ data: cronJobSeed(cronSchedules[0]?.id ?? 0) });
        } catch (err) {
            logger.error("⚠️[WARNING]: Failed to create cron job, skipping...", err);
        }
    }
}

(async function main() {
    try {
        await Seeder.createAdmin();
        logger.info("✅[SUCCESS]: Admin Seeder completed");

        await Seeder.createWebsites();
        logger.info("✅[SUCCESS]: Websites Seeder completed");

        await Seeder.createCron();
        logger.info("✅[SUCCESS]: Cron Seeder completed");

        logger.info("🎉 Seeder finished successfully");
    } catch (e) {
        logger.error("❌[FAILED]: Seeder encountered an unexpected error", e);
        process.exitCode = 1;
    } finally {
        await prismaClient.$disconnect();
    }
})();
