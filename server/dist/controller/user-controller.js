"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user-service");
class UserController {
    static async findUser(req, res, next) {
        try {
            const response = await user_service_1.UserService.find(req.user);
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async updateProfile(req, res, next) {
        try {
            const response = await user_service_1.UserService.updateProfile(req.user, req.body);
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async changePassword(req, res, next) {
        try {
            await user_service_1.UserService.changePassword(req.user, req.body);
            res.status(200).json({
                data: "OK",
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map