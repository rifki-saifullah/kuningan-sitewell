import type { UserRequest } from "../type/user-request";
import type { NextFunction, Response } from "express";
import { toUserAuth, type JWTPayload, type UserAuth } from "../model/auth-model";
import { AuthService } from "../service/auth-service";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ errors: "Unauthorized" }).end();
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ errors: "Invalid credential" }).end();
    }

    const token = parts[1];

    try {
        const payload: JWTPayload = AuthService.verifyJWT(token!);
        const userAuth: UserAuth = toUserAuth(payload.id, payload.username, token!);
        req.user = userAuth;
        return next();
    } catch {
        return res.status(401).json({ errors: "Invalid credential" }).end();
    }
};