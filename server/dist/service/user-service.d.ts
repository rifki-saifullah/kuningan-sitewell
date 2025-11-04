import type { UserAuth } from "../model/auth-model";
import { type ChangePasswordRequest, type UpdateProfileRequest, type UserResponse } from "../model/user-model";
export declare class UserService {
    static find(user: UserAuth): Promise<UserResponse>;
    static updateProfile(user: UserAuth, request: UpdateProfileRequest): Promise<UserResponse>;
    static changePassword(user: UserAuth, request: ChangePasswordRequest): Promise<void>;
}
//# sourceMappingURL=user-service.d.ts.map