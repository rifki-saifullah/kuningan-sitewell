"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
    static UPDATE_PROFILE = zod_1.z.object({
        username: zod_1.z.string().min(1).max(256).optional(),
        email: zod_1.z.string().min(1).max(256).optional(),
    });
    static UPDATE_PASSWORD = zod_1.z.object({
        current_password: zod_1.z.string().min(1).max(128),
        new_password: zod_1.z.string().min(8).max(128),
    });
}
exports.UserValidation = UserValidation;
//# sourceMappingURL=user-validation.js.map