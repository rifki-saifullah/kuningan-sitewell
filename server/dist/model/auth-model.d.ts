import type { User } from "../../generated/prisma";
export type UserAuth = {
    id: number;
    username: string;
    token: string;
};
export type JWTPayload = {
    id: number;
    username: string;
};
export type LoginRequest = {
    email: string;
    password: string;
};
export type TokenResponse = {
    token: string;
    expires_in: number;
    type: string;
};
export declare function toUserAuth(id: number, username: string, token: string): UserAuth;
export declare function toJWTPayload(user: User): JWTPayload;
export declare function toTokenResponse(token: string, expires_in: number, type?: string): TokenResponse;
//# sourceMappingURL=auth-model.d.ts.map