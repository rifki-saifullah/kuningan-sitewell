import { PrismaClient } from "../../generated/prisma";
export declare const prismaClient: PrismaClient<{
    log: ({
        emit: "event";
        level: "query";
    } | {
        emit: "event";
        level: "error";
    } | {
        emit: "event";
        level: "info";
    } | {
        emit: "event";
        level: "warn";
    })[];
}, "error" | "info" | "query" | "warn", import("../../generated/prisma/runtime/library").DefaultArgs>;
//# sourceMappingURL=database.d.ts.map