import { type UserAuth, type LoginRequest, type TokenResponse, type JWTPayload } from "../model/auth-model";
export declare class AuthService {
    static signJWT(payload: JWTPayload): string;
    static verifyJWT(token: string): JWTPayload;
    static login(request: LoginRequest): Promise<TokenResponse>;
    static refresh(user: UserAuth): Promise<TokenResponse>;
    static logout(token: string): Promise<void>;
}
//# sourceMappingURL=auth-service.d.ts.map