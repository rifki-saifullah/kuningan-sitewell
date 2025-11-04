"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
class AuthValidation {
    static LOGIN = zod_1.z.object({
        email: zod_1.z.string().min(1).max(256),
        password: zod_1.z.string().min(1).max(128),
    });
}
exports.AuthValidation = AuthValidation;
//# sourceMappingURL=auth-validation.js.map