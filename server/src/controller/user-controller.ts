import type { NextFunction, Request, Response } from "express";
import type { UserRequest } from "../type/user-request";
import { UserResponse } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
    static async findUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: UserResponse = await UserService.find(req.user!);
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async updateProfile(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: UserResponse = await UserService.updateProfile(req.user!, req.body);
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async changePassword(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await UserService.changePassword(req.user!, req.body);
            res.status(200).json({
                data: "OK",
            });
        } catch (e) {
            next(e);
        }
    }
}