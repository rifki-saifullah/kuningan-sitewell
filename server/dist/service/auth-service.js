"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("../application/database");
const config_1 = require("../config/config");
const response_error_1 = require("../error/response-error");
const auth_model_1 = require("../model/auth-model");
const auth_validation_1 = require("../validation/auth-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("../application/redis"));
class AuthService {
    static signJWT(payload) {
        const options = {
            expiresIn: config_1.config.auth.expiresIn,
        };
        return jsonwebtoken_1.default.sign(payload, config_1.config.auth.secretKey, options);
    }
    ;
    static verifyJWT(token) {
        try {
            return jsonwebtoken_1.default.verify(token, config_1.config.auth.secretKey);
        }
        catch (e) {
            if (e.name === "TokenExpiredError") {
                throw new response_error_1.ResponseError(401, "Token expired");
            }
            else if (e.name === "JsonWebTokenError") {
                throw new response_error_1.ResponseError(401, "Invalid credential");
            }
            else {
                throw new response_error_1.ResponseError(401, "Token verification failed");
            }
        }
    }
    ;
    static async login(request) {
        const loginRequest = validation_1.Validation.validate(auth_validation_1.AuthValidation.LOGIN, request);
        const user = await database_1.prismaClient.user.findUnique({
            where: {
                email: loginRequest.email,
            },
        });
        if (!user) {
            throw new response_error_1.ResponseError(401, "Email or password is wrong");
        }
        const isPasswordValid = await bcrypt_1.default.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new response_error_1.ResponseError(401, "Email or password is wrong");
        }
        const token = AuthService.signJWT((0, auth_model_1.toJWTPayload)(user));
        return (0, auth_model_1.toTokenResponse)(token, config_1.config.auth.expiresIn);
    }
    static async refresh(user) {
        const token = AuthService.signJWT(user);
        return (0, auth_model_1.toTokenResponse)(token, config_1.config.auth.expiresIn);
    }
    static async logout(token) {
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (!decodedToken?.exp)
            throw new response_error_1.ResponseError(401, "Invalid token");
        const ttl = decodedToken.exp - Math.floor(Date.now() / 1000);
        await redis_1.default.set(`bl:${token}`, "1", { EX: ttl });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth-service.js.map