import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 200,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});