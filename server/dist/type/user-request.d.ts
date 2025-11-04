import type { Request } from "express";
import type { UserAuth } from "../model/auth-model";
export interface UserRequest extends Request {
    user?: UserAuth;
}
//# sourceMappingURL=user-request.d.ts.map