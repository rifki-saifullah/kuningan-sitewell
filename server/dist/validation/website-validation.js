"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteValidation = void 0;
const zod_1 = require("zod");
class WebsiteValidation {
    static CREATE = zod_1.z.object({
        name: zod_1.z.string().min(1).max(20),
        description: zod_1.z.string().min(1).max(256),
        url: zod_1.z.string().min(1).max(128),
    });
    static UPDATE = zod_1.z.object({
        name: zod_1.z.string().min(1).max(20),
        description: zod_1.z.string().min(1).max(256),
        url: zod_1.z.string().min(1).max(128),
    });
}
exports.WebsiteValidation = WebsiteValidation;
//# sourceMappingURL=website-validation.js.map