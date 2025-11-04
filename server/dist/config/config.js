"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    app: {
        port: parseInt(process.env.PORT || "3001", 10),
    },
    auth: {
        secretKey: process.env.SECRET_KEY || "SUPERSECRETKEY",
        expiresIn: parseInt(process.env.EXPIRES_IN || "3600", 10),
    },
    redis: {
        url: process.env.REDIS_URL || "redis://localhost:6379",
    },
    admin: {
        username: process.env.ADMIN_USERNAME || "Admin",
        email: process.env.ADMIN_EMAIL || "admin@mail.me",
        password: process.env.ADMIN_PASSWORD || "securepass",
    },
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN || "",
        chatId: process.env.TELEGRAM_CHAT_ID || "",
    },
    cron: {
        schedule: process.env.NOTIFICATION_CRON_SCHEDULE || "0 * * * * *",
    },
};
//# sourceMappingURL=config.js.map