"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const prisma_1 = require("../../generated/prisma");
const logging_1 = require("./logging");
exports.prismaClient = new prisma_1.PrismaClient({
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
exports.prismaClient.$on("error", (e) => {
    logging_1.logger.error("❌[FAILED]: Prisma Client");
    logging_1.logger.error("💬[ERROR MESSAGE]: ", e);
});
exports.prismaClient.$on("warn", (w) => {
    logging_1.logger.warn("⚠️[WARNING]: Prisma Client");
    logging_1.logger.warn("💬[WARNING MESSAGE]: ", w);
});
exports.prismaClient.$on("info", (i) => {
    logging_1.logger.info("ℹ️[INFO]: Prisma Client");
    logging_1.logger.info("💬[INFO MESSAGE]: ", i);
});
exports.prismaClient.$on("query", (q) => {
    logging_1.logger.info("💾[QUERY]: Prisma Client");
    logging_1.logger.info("💬[QUERY MESSAGE]: ", q);
});
//# sourceMappingURL=database.js.map