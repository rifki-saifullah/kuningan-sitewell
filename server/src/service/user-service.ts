import type { User } from "../../generated/prisma";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import type { UserAuth } from "../model/auth-model";
import { type ChangePasswordRequest, toUserResponse, type UpdateProfileRequest, type UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
    static async find(user: UserAuth): Promise<UserResponse> {
        const currentUser = await prismaClient.user.findFirst({
            where: {
                id: user.id,
            },
        });

        return toUserResponse(currentUser as User);
    }

    static async updateProfile(user: UserAuth, request: UpdateProfileRequest): Promise<UserResponse> {
        const validatedRequest = Validation.validate(UserValidation.UPDATE_PROFILE, request);

        const cuurrentUser = await this.find(user);

        if (cuurrentUser.email == validatedRequest.email) {
            throw new ResponseError(409, "Email is already been taken.");
        }

        const updatedUser = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                username: validatedRequest.username,
                email: validatedRequest.email,
            },
        });

        return toUserResponse(updatedUser);
    }

    static async changePassword(user: UserAuth, request: ChangePasswordRequest): Promise<void> {
        const validatedRequest = Validation.validate(UserValidation.UPDATE_PASSWORD, request);

        const currentUser: User = await prismaClient.user.findFirst({
            where: {
                id: user.id,
            },
        }) as User;

        const isPasswordValid = await bcrypt.compare(validatedRequest.current_password, currentUser.password);

        if (!isPasswordValid) {
            throw new ResponseError(400, "Current password is incorrect");
        }

        const newPasswordHash = await bcrypt.hash(validatedRequest.new_password, 10);

        await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: newPasswordHash,
            },
        });
    }
};