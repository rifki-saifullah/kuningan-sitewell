import type { NextFunction, Request, Response } from "express";
import type { LoginRequest, TokenResponse } from "../model/auth-model";
import { AuthService } from "../service/auth-service";
import type { UserRequest } from "../type/user-request";

export class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginRequest = req.body as LoginRequest;
            const response: TokenResponse = await AuthService.login(request);
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async refresh(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: TokenResponse = await AuthService.refresh(req.user!);
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async check(req: UserRequest, res: Response, next: NextFunction) {
        res.status(200).json({
            data: "OK",
        });
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: void = await AuthService.logout(req.user?.token!);
            res.status(200).json({
                data: "OK",
            });
        } catch (e) {
            next(e);
        }
    }
}