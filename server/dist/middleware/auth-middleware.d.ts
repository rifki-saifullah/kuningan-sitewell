import type { UserRequest } from "../type/user-request";
import type { NextFunction, Response } from "express";
export declare const authMiddleware: (req: UserRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=auth-middleware.d.ts.map