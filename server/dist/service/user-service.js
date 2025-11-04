"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    static async find(user) {
        const currentUser = await database_1.prismaClient.user.findFirst({
            where: {
                id: user.id,
            },
        });
        return (0, user_model_1.toUserResponse)(currentUser);
    }
    static async updateProfile(user, request) {
        const validatedRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE_PROFILE, request);
        const cuurrentUser = await this.find(user);
        if (cuurrentUser.email == validatedRequest.email) {
            throw new response_error_1.ResponseError(409, "Email is already been taken.");
        }
        const updatedUser = await database_1.prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                username: validatedRequest.username,
                email: validatedRequest.email,
            },
        });
        return (0, user_model_1.toUserResponse)(updatedUser);
    }
    static async changePassword(user, request) {
        const validatedRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE_PASSWORD, request);
        const currentUser = await database_1.prismaClient.user.findFirst({
            where: {
                id: user.id,
            },
        });
        const isPasswordValid = await bcrypt_1.default.compare(validatedRequest.current_password, currentUser.password);
        if (!isPasswordValid) {
            throw new response_error_1.ResponseError(400, "Current password is incorrect");
        }
        const newPasswordHash = await bcrypt_1.default.hash(validatedRequest.new_password, 10);
        await database_1.prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: newPasswordHash,
            },
        });
    }
}
exports.UserService = UserService;
;
//# sourceMappingURL=user-service.js.map