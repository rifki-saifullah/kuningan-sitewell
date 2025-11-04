"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth-service");
class AuthController {
    static async login(req, res, next) {
        try {
            const request = req.body;
            const response = await auth_service_1.AuthService.login(request);
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async refresh(req, res, next) {
        try {
            const response = await auth_service_1.AuthService.refresh(req.user);
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async check(req, res, next) {
        res.status(200).json({
            data: "OK",
        });
    }
    static async logout(req, res, next) {
        try {
            const response = await auth_service_1.AuthService.logout(req.user?.token);
            res.status(200).json({
                data: "OK",
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth-controller.js.map