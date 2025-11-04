import type { NextFunction, Request, Response } from "express";
import type { UserRequest } from "../type/user-request";
export declare class AuthController {
    static login(req: Request, res: Response, next: NextFunction): Promise<void>;
    static refresh(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static check(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static logout(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=auth-controller.d.ts.map