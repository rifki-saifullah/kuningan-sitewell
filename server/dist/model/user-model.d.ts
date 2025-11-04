import type { User } from '../../generated/prisma';
export type UpdateProfileRequest = {
    username: string;
    email: string;
};
export type ChangePasswordRequest = {
    current_password: string;
    new_password: string;
};
export type UserResponse = {
    id: number;
    username: string;
    email: string;
};
export declare function toUserResponse(user: User): UserResponse;
//# sourceMappingURL=user-model.d.ts.map