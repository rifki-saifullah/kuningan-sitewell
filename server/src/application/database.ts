import { PrismaClient } from "../../generated/prisma";
import { logger } from "./logging";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
});

prismaClient.$on("error", (e: any) => {
    logger.error("❌[FAILED]: Prisma Client");
    logger.error("💬[ERROR MESSAGE]: ", e);
})

prismaClient.$on("warn", (w: any) => {
    logger.warn("⚠️[WARNING]: Prisma Client");
    logger.warn("💬[WARNING MESSAGE]: ", w);
})

prismaClient.$on("info", (i: any) => {
    logger.info("ℹ️[INFO]: Prisma Client")
    logger.info("💬[INFO MESSAGE]: ", i);
})

prismaClient.$on("query", (q: any) => {
    logger.info("💾[QUERY]: Prisma Client");
    logger.info("💬[QUERY MESSAGE]: ", q);
})