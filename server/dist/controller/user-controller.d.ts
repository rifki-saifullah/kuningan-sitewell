import type { NextFunction, Response } from "express";
import type { UserRequest } from "../type/user-request";
export declare class UserController {
    static findUser(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static updateProfile(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static changePassword(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=user-controller.d.ts.map