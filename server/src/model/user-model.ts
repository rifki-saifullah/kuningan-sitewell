import type { User } from '../../generated/prisma';

export type UpdateProfileRequest = {
    username: string;
    email: string;
}

export type ChangePasswordRequest = {
    current_password: string;
    new_password: string;
}

export type UserResponse = {
    id: number;
    username: string;
    email: string;
};

export function toUserResponse(user: User): UserResponse {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
};