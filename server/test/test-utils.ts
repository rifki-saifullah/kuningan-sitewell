import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
import { LoginRequest, TokenResponse } from "../src/model/auth-model";
import { CronJob, CronSchedule, User, Website } from "../generated/prisma/client";
import { AuthService } from "../src/service/auth-service";
import { cronJobSeed, cronScheduleSeeds } from "../src/seeder/item";

export const DEFAULTS = {
    USER: {
        USERNAME: "test",
        EMAIL: "test@mail.me",
        PASSWORD: "securepass",
    },
    WEBSITE: {
        NAME: "Name of Website",
        DESCRIPTION: "Description of Website",
        URL: "https://github.com/rifki-saifullah",
        IS_HEALTHY: true,
        RESPONSE_TIME: 200,
        STATUS_CODE: 200,
        MESSAGE: "OK",
    },
};

export class UserTest {
    static async reset() {
        await prismaClient.user.deleteMany();
    }

    static async create(
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
}

export class AuthTest {
    static async login(
        email: string = DEFAULTS.USER.EMAIL,
        password: string = DEFAULTS.USER.PASSWORD,
    ): Promise<TokenResponse> {
        const loginRequest: LoginRequest = {
            email: email,
            password: password,
        };

        return await AuthService.login(loginRequest);
    }
}

export class WebsiteTest {
    static async reset() {
        await prismaClient.website.deleteMany();
    }

    static async create(
        url: string = DEFAULTS.WEBSITE.URL,
        response_time: number = DEFAULTS.WEBSITE.RESPONSE_TIME,
        is_healthy: boolean = DEFAULTS.WEBSITE.IS_HEALTHY,
        name: string = DEFAULTS.WEBSITE.NAME,
        description: string = DEFAULTS.WEBSITE.DESCRIPTION,
        status_code: number = DEFAULTS.WEBSITE.STATUS_CODE,
        message: string = DEFAULTS.WEBSITE.MESSAGE,
    ): Promise<Website> {
        return await prismaClient.website.create({
            data: {
                name: name,
                description: description,
                url: url,
                is_healthy: is_healthy,
                response_time: response_time,
                status_code: status_code,
                message: message,
            }
        });
    }
}

export class CronTest {
    static async reset() {
        await prismaClient.cronJob.deleteMany();
        await prismaClient.cronSchedule.deleteMany();
    }

    static async create() {
        let cronSchedules: CronSchedule[] = [];

        for (const cronScheduleSeed of cronScheduleSeeds) {
            const cronSchedule = await prismaClient.cronSchedule.create({ data: cronScheduleSeed });
            cronSchedules.push(cronSchedule);
        }

        await prismaClient.cronJob.create({ data: cronJobSeed(cronSchedules[1]!.id) });
    }
}
