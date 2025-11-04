"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../application/database");
const config_1 = require("../config/config");
const logging_1 = require("../application/logging");
const website_service_1 = require("../service/website-service");
const item_1 = require("./item");
class Seeder {
    static async createAdmin() {
        try {
            await database_1.prismaClient.user.deleteMany({});
            const admin = await database_1.prismaClient.user.create({
                data: {
                    username: config_1.config.admin.username,
                    email: config_1.config.admin.email,
                    password: await bcrypt_1.default.hash(config_1.config.admin.password, 10),
                },
            });
            return admin;
        }
        catch (err) {
            logging_1.logger.error("⚠️[WARNING]: Failed to create admin, skipping...", err);
            return null;
        }
    }
    static async createWebsites() {
        await database_1.prismaClient.website.deleteMany({});
        const websites = item_1.websiteSeeds;
        for (const website of websites) {
            try {
                await website_service_1.WebsiteService.create(website);
            }
            catch (err) {
                logging_1.logger.error(`⚠️[WARNING]: Failed to create website "${website.name}", skipping...`, err);
            }
        }
    }
    static async createCron() {
        await database_1.prismaClient.cronSchedule.deleteMany({});
        let cronSchedules = [];
        for (const cronScheduleSeed of item_1.cronScheduleSeeds) {
            try {
                const cronSchedule = await database_1.prismaClient.cronSchedule.create({ data: cronScheduleSeed });
                cronSchedules.push(cronSchedule);
            }
            catch (err) {
                logging_1.logger.error(`⚠️[WARNING]: Failed to create cron schedule "${cronScheduleSeed.description}", skipping...`, err);
            }
        }
        try {
            await database_1.prismaClient.cronJob.deleteMany({});
            await database_1.prismaClient.cronJob.create({ data: (0, item_1.cronJobSeed)(cronSchedules[0]?.id ?? 0) });
        }
        catch (err) {
            logging_1.logger.error("⚠️[WARNING]: Failed to create cron job, skipping...", err);
        }
    }
}
(async function main() {
    try {
        await Seeder.createAdmin();
        logging_1.logger.info("✅[SUCCESS]: Admin Seeder completed");
        await Seeder.createWebsites();
        logging_1.logger.info("✅[SUCCESS]: Websites Seeder completed");
        await Seeder.createCron();
        logging_1.logger.info("✅[SUCCESS]: Cron Seeder completed");
        logging_1.logger.info("🎉 Seeder finished successfully");
    }
    catch (e) {
        logging_1.logger.error("❌[FAILED]: Seeder encountered an unexpected error", e);
        process.exitCode = 1;
    }
    finally {
        await database_1.prismaClient.$disconnect();
    }
})();
//# sourceMappingURL=seeder.js.map