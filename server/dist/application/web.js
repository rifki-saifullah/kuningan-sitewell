"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const api_1 = require("../route/api");
const error_middleware_1 = require("../middleware/error-middleware");
const rate_limiter_1 = require("./rate-limiter");
const cors_1 = require("./cors");
exports.web = (0, express_1.default)();
exports.web.use(express_1.default.json());
exports.web.use(cors_1.Cors);
exports.web.use(rate_limiter_1.limiter);
exports.web.use(api_1.guestRouter);
exports.web.use(api_1.authRouter);
exports.web.use(error_middleware_1.errorMiddleware);
//# sourceMappingURL=web.js.map