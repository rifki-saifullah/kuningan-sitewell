import type { User } from "../../generated/prisma";

export type UserAuth = {
    id: number;
    username: string;
    token: string;
}

export type JWTPayload = {
    id: number;
    username: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type TokenResponse = {
    token: string;
    expires_in: number;
    type: string;
}

export function toUserAuth(id: number, username: string, token: string): UserAuth {
    return {
        id: id,
        username: username,
        token: token,
    };
}

export function toJWTPayload(user: User): JWTPayload {
    return {
        id: user.id,
        username: user.username,
    }
}

export function toTokenResponse(
    token: string,
    expires_in: number,
    type: string = "Bearer",
): TokenResponse {
    return {
        token: token,
        expires_in: expires_in,
        type: type,
    }
}