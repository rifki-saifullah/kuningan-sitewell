import { prismaClient } from "../application/database";
import { config } from "../config/config";
import { ResponseError } from "../error/response-error";
import { toTokenResponse , type UserAuth, type LoginRequest, type TokenResponse, type JWTPayload, toJWTPayload } from "../model/auth-model";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import redisClient from "../application/redis";

export class AuthService {
    static signJWT(payload: JWTPayload): string {
        const options: SignOptions = {
            expiresIn: config.auth.expiresIn,
        };

        return jwt.sign(payload, config.auth.secretKey, options);
    };

    static verifyJWT(token: string): JWTPayload {
        try {
            return jwt.verify(token, config.auth.secretKey) as JWTPayload;

        } catch (e: any) {
            if (e.name === "TokenExpiredError") {
                throw new ResponseError(401, "Token expired")
            } else if (e.name === "JsonWebTokenError") {
                throw new ResponseError(401, "Invalid credential")
            } else {
                throw new ResponseError(401, "Token verification failed")
            }
        }
    };

    static async login(request: LoginRequest): Promise<TokenResponse> {
        const loginRequest = Validation.validate(AuthValidation.LOGIN, request);

        const user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email,
            },
        });

        if (!user) {
            throw new ResponseError(401, "Email or password is wrong")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

        if (!isPasswordValid) {
            throw new ResponseError(401, "Email or password is wrong")
        }

        const token = AuthService.signJWT(toJWTPayload(user));

        return toTokenResponse(token, config.auth.expiresIn)
    }

    static async refresh(user: UserAuth): Promise<TokenResponse> {
        const token = AuthService.signJWT(user);

        return toTokenResponse(token, config.auth.expiresIn)
    }
    
    static async logout(token: string): Promise<void> {
        const decodedToken = jwt.decode(token) as { exp?: number };
        if (!decodedToken?.exp) throw new ResponseError(401, "Invalid token");

        const ttl = decodedToken.exp - Math.floor(Date.now() / 1000);
        await redisClient.set(`bl:${token}`, "1", {EX: ttl});
    }
}